import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { ALL_TOPPINGS } from '../hooks/usePizza';
import type { Pizza } from '../types/pizza';

export type PizzaFormValues = {
  name: string;
  toppings: string[];
  fanFavorite: 'yes' | 'no';
  delivery: 'yes' | 'no';
};

interface Props {
  initialValues?: Pizza;
  onSubmit: (values: PizzaFormValues) => Promise<void> | void;
  onDelete?: () => Promise<void> | void;
  submitLabel?: string;
  isSubmitting?: boolean;
}

const PizzaForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  onDelete,
  submitLabel = 'Save',
  isSubmitting = false,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PizzaFormValues>({
    defaultValues: initialValues
      ? {
          name: initialValues.name,
          toppings: initialValues.toppings,
          fanFavorite: initialValues.fanFavorite ? 'yes' : 'no',
          delivery: initialValues.delivery ? 'yes' : 'no',
        }
      : {
          name: '',
          toppings: [],
          fanFavorite: 'no',
          delivery: 'yes',
        },
  });

  const deliveryOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Pizza Name */}
      <Form.Group className="mb-3">
        <Form.Label>Pizza Name</Form.Label>
        <Form.Control
          id="pizza-name"
          type="text"
          placeholder="Enter pizza name"
          {...register('name', { required: 'Name is required' })}
          disabled={isSubmitting}
        />
        {errors.name && (
          <Form.Text className="text-danger">{errors.name.message}</Form.Text>
        )}
      </Form.Group>

      {/* Toppings - multi-checkbox */}
      <Form.Group className="mb-3">
        <Form.Label>Toppings</Form.Label>
        <div>
          {ALL_TOPPINGS.map((topping) => (
            <Form.Check
              key={topping}
              type="checkbox"
              label={topping}
              value={topping}
              {...register('toppings')}
              disabled={isSubmitting}
              data-cy={`topping-${topping}`}
            />
          ))}
        </div>
      </Form.Group>

      {/* Fan Favorite - radio */}
      <Form.Group className="mb-3">
        <Form.Label>Fan Favorite?</Form.Label>
        <div>
          <Form.Check
            type="radio"
            label="Yes"
            value="yes"
            {...register('fanFavorite')}
            inline
            disabled={isSubmitting}
            data-cy="fanFavorite-yes"
          />
          <Form.Check
            type="radio"
            label="No"
            value="no"
            {...register('fanFavorite')}
            inline
            disabled={isSubmitting}
            data-cy="fanFavorite-no"
          />
        </div>
      </Form.Group>

      {/* Delivery - React-Select */}
      <Form.Group className="mb-3">
        <Form.Label>Available for Delivery?</Form.Label>
        <Controller
          name="delivery"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              isDisabled={isSubmitting}
              options={deliveryOptions}
              value={deliveryOptions.find((opt) => opt.value === field.value)}
              onChange={(option) => field.onChange(option?.value ?? 'no')}
              classNamePrefix="react-select"
            />
          )}
        />
      </Form.Group>

      <div className="d-flex gap-2">
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : submitLabel}
        </Button>

        {onDelete && (
          <Button
            variant="danger"
            type="button"
            onClick={() => onDelete()}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Working…' : 'Delete'}
          </Button>
        )}
      </div>
    </Form>
  );
};

export default PizzaForm;
