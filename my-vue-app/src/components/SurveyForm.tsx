import { useState } from 'react';
import { useForm } from 'react-hook-form';

// Define the shape of our form data
type SurveyData = {
  name: string;
  email: string;
  age: number;
  experience: string;
  satisfaction: string;
  recommendation: string;
  comments: string;
  subscribe: boolean;
};

const SurveyForm = () => {
  const [submittedData, setSubmittedData] = useState<SurveyData | null>(null);

  // Initialize React Hook Form
  const {
    register,        // Connects inputs to form
    handleSubmit,    // Handles form submission
    watch,          // Watch specific fields
    formState: { errors, isValid, isDirty }, // Form state
    reset,      // Reset form
  } = useForm<SurveyData>({
    mode: 'onChange', // Validate on every change
    defaultValues: {
      experience: 'beginner',
      satisfaction: '5',
      subscribe: true,
    }
  });

  // Watch specific fields for real-time updates
  const watchName = watch('name');
  const watchAge = watch('age');
  const watchAll = watch(); // Watch all fields

  // Handle form submission
  const onSubmit = (data: SurveyData) => {
    console.log('Form submitted:', data);
    setSubmittedData(data);
    // Reset form after submission
    setTimeout(() => {
      reset();
      setSubmittedData(null);
    }, 5000);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>📋 React Learning Survey</h1>
      
      {/* Live Form State Display */}
      <div style={{
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f0f8ff',
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <h3>🔍 Form State (Live)</h3>
        <p>Is Valid: {isValid ? '✅ Yes' : '❌ No'}</p>
        <p>Is Dirty (Changed): {isDirty ? 'Yes' : 'No'}</p>
        <p>Errors Count: {Object.keys(errors).length}</p>
        {watchName && <p>Hello, {watchName}! 👋</p>}
        {watchAge && watchAge < 18 && <p>⚠️ You must be 18 or older</p>}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Name *
          </label>
          <input
            {...register('name', { 
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
              pattern: { value: /^[A-Za-z\s]+$/, message: 'Name should only contain letters' }
            })}
            style={{
              width: '100%',
              padding: '10px',
              border: errors.name ? '2px solid red' : '1px solid #ddd',
              borderRadius: '5px'
            }}
            placeholder="John Doe"
          />
          {errors.name && (
            <span style={{ color: 'red', fontSize: '14px' }}>
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email *
          </label>
          <input
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            style={{
              width: '100%',
              padding: '10px',
              border: errors.email ? '2px solid red' : '1px solid #ddd',
              borderRadius: '5px'
            }}
            placeholder="john@example.com"
          />
          {errors.email && (
            <span style={{ color: 'red', fontSize: '14px' }}>
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Age Field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Age *
          </label>
          <input
            type="number"
            {...register('age', { 
              required: 'Age is required',
              min: { value: 18, message: 'Must be 18 or older' },
              max: { value: 100, message: 'Must be 100 or younger' }
            })}
            style={{
              width: '100%',
              padding: '10px',
              border: errors.age ? '2px solid red' : '1px solid #ddd',
              borderRadius: '5px'
            }}
          />
          {errors.age && (
            <span style={{ color: 'red', fontSize: '14px' }}>
              {errors.age.message}
            </span>
          )}
        </div>

        {/* Experience Level */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            React Experience Level
          </label>
          <select
            {...register('experience')}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ddd'
            }}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        {/* Satisfaction Rating */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            How satisfied are you with React? (1-10)
          </label>
          <input
            type="range"
            min="1"
            max="10"
            {...register('satisfaction')}
            style={{ width: '100%' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span>😞 1</span>
            <span>Current: {watch('satisfaction')}</span>
            <span>10 😊</span>
          </div>
        </div>

        {/* Recommendation */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Would you recommend React?
          </label>
          <div>
            <label style={{ marginRight: '15px' }}>
              <input
                type="radio"
                value="yes"
                {...register('recommendation', { required: 'Please select an option' })}
              />
              Yes
            </label>
            <label style={{ marginRight: '15px' }}>
              <input
                type="radio"
                value="no"
                {...register('recommendation', { required: 'Please select an option' })}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                value="maybe"
                {...register('recommendation', { required: 'Please select an option' })}
              />
              Maybe
            </label>
          </div>
          {errors.recommendation && (
            <span style={{ color: 'red', fontSize: '14px' }}>
              {errors.recommendation.message}
            </span>
          )}
        </div>

        {/* Comments */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Comments
          </label>
          <textarea
            {...register('comments', {
              maxLength: { value: 200, message: 'Comments cannot exceed 200 characters' }
            })}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: errors.comments ? '2px solid red' : '1px solid #ddd',
              minHeight: '100px'
            }}
            placeholder="Share your thoughts..."
          />
          <div style={{ fontSize: '12px', color: '#666' }}>
            {watch('comments')?.length || 0}/200 characters
          </div>
          {errors.comments && (
            <span style={{ color: 'red', fontSize: '14px' }}>
              {errors.comments.message}
            </span>
          )}
        </div>

        {/* Subscribe Checkbox */}
        <div style={{ marginBottom: '20px' }}>
          <label>
            <input
              type="checkbox"
              {...register('subscribe')}
              style={{ marginRight: '10px' }}
            />
            Subscribe to newsletter
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: isValid ? '#27ae60' : '#95a5a6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: isValid ? 'pointer' : 'not-allowed'
          }}
        >
          Submit Survey {!isValid && '(Fix errors first)'}
        </button>
      </form>

      {/* Show submitted data */}
      {submittedData && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#d4edda',
          borderRadius: '8px'
        }}>
          <h3>✅ Form Submitted Successfully!</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Form will reset in 5 seconds...
          </p>
        </div>
      )}

      {/* Debug Panel */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#fff3cd',
        borderRadius: '8px'
      }}>
        <h3>🔧 Debug: All Form Values (Live)</h3>
        <pre style={{ fontSize: '12px' }}>
          {JSON.stringify(watchAll, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default SurveyForm;