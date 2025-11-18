import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { ALL_TOPPINGS } from '../hooks/usePizza';
import type { Pizza } from '../types/pizza';

type PizzaFormValues = {
  name: string;
  toppings: string[];          // store labels; we convert later
  fanFavorite: 'yes' | 'no';
  delivery: 'yes' | 'no';
};

interface Props {
  initialValues?: Pizza;
  onSubmit: (values: PizzaFormValues) => void;
  onDelete?: () => void;
  submitLabel?: string;
}

const PizzaForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  onDelete,
  submitLabel = 'Save',
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
          type="text"
          placeholder="Enter pizza name"
          {...register('name', { required: 'Name is required' })}
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
          />
          <Form.Check
            type="radio"
            label="No"
            value="no"
            {...register('fanFavorite')}
            inline
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
              options={deliveryOptions}
              value={deliveryOptions.find((opt) => opt.value === field.value)}
              onChange={(option) => field.onChange(option?.value ?? 'no')}
            />
          )}
        />
      </Form.Group>

      <div className="d-flex gap-2">
        <Button variant="primary" type="submit">
          {submitLabel}
        </Button>

        {onDelete && (
          <Button variant="danger" type="button" onClick={onDelete}>
            Delete
          </Button>
        )}
      </div>
    </Form>
  );
};

export type { PizzaFormValues };
export default PizzaForm;
