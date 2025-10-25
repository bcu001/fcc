import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "@/components/Loader"; // Assuming you have a Loader component
import { useNavigate } from "react-router-dom"; // To redirect after creation
import useDocumentTitle from "@/hooks/useDocumentTitle";

// Helper component for form inputs
const FormInput = ({
  label,
  name,
  type = "text",
  register,
  errors,
  ...rest
}) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={name} className="font-semibold text-sm">
      {label}
    </label>
    <input
      id={name}
      type={type}
      {...register(name, rest.rules)} // Pass rules to register
      className={`border p-2 rounded text-sm focus:outline-none focus:ring-2 ${
        errors[name]
          ? "border-red-500 focus:ring-red-500"
          : "focus:ring-green-500"
      }`}
      {...rest}
    />
    {errors[name] && (
      <p className="text-red-500 text-xs italic">{errors[name].message}</p>
    )}
  </div>
);

// Helper component for select inputs
const FormSelect = ({ label, name, register, errors, options, ...rest }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={name} className="font-semibold text-sm">
      {label}
    </label>
    <select
      id={name}
      {...register(name, rest.rules)}
      className={`border p-2 rounded text-sm focus:outline-none focus:ring-2 ${
        errors[name]
          ? "border-red-500 focus:ring-red-500"
          : "focus:ring-green-500"
      } bg-white appearance-none`}
      {...rest}
    >
      <option value="" disabled>
        Select {label}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </option>
      ))}
    </select>
    {errors[name] && (
      <p className="text-red-500 text-xs italic">{errors[name].message}</p>
    )}
  </div>
);

// Main Component
const CreateCharacterPage = () => {
  useDocumentTitle("FCC | Create");
  const serverURL = import.meta.env.VITE_SEVER_URL;
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      race: "",
      class: "",
      gender: "male", // Default to 'male'
      strength: 10, // Sensible defaults for numbers
      agility: 10,
      intelligence: 10,
      luck: 10,
      level: 1,
      status: "alive", // Default to 'alive'
      "special ability": "",
      description: "",
      imageURL: "",
    },
  });

  // Function to handle form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmissionError(null);

    // Filter out empty strings if the API expects null or undefined for optional fields
    const payload = Object.keys(data).reduce((acc, key) => {
      // Convert stat strings to numbers
      if (
        ["strength", "agility", "intelligence", "luck", "level"].includes(key)
      ) {
        acc[key] = Number(data[key]);
        return acc;
      }

      // Handle nested stats structure for the API
      if (["strength", "agility", "intelligence", "luck"].includes(key)) {
        acc.stats = acc.stats || {};
        acc.stats[key] = Number(data[key]);
        return acc;
      }

      // Exclude empty strings for optional fields (like imageURL, special ability, description)
      if (typeof data[key] === "string" && data[key].trim() === "") {
        // Do nothing, effectively dropping the key or letting the API default
        return acc;
      }

      // Regular assignment
      acc[key] = data[key];
      return acc;
    }, {});

    // Cleanup: remove flat stats keys from top level if they were only used for RHF registration
    const finalPayload = {
      ...payload,
      stats: {
        strength: payload.strength,
        agility: payload.agility,
        intelligence: payload.intelligence,
        luck: payload.luck,
      },
    };
    delete finalPayload.strength;
    delete finalPayload.agility;
    delete finalPayload.intelligence;
    delete finalPayload.luck;

    try {
      const res = await axios.post(
        `${serverURL}/api/v1/characters`,
        finalPayload
      );

      if (res.status === 200) {
        alert("Character created successfully! 🎉");
        // Optionally redirect to the newly created character's page or home
        // Since the API only returns a string, we can't get the ID, so redirect to a list or home.
        navigate("/");
        reset(); // Clear the form
      } else {
        throw new Error(
          res.data?.message ||
            `Failed to create character with status: ${res.status}`
        );
      }
    } catch (error) {
      console.error("Error creating character:", error);
      // Display a user-friendly error
      setSubmissionError(
        error.response?.data?.message ||
          "An unexpected error occurred while saving the character."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    // Show a loader while the API call is in progress
    return <Loader />;
  }

  return (
    <div className="mx-4 my-2">
      <div className="">
        <div className="flex flex-col">
          <div className="font-bold text-lg border-b pb-1 mb-2">
            Create New Character ✍️
          </div>
          <div className="text-[10px] text-gray-600">
            Fill in the details below to forge a new hero.
          </div>
        </div>
      </div>

      {/* Submission Error Alert */}
      {submissionError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4"
          role="alert"
        >
          <strong className="font-bold">Creation Failed!</strong>
          <span className="block sm:inline ml-2">{submissionError}</span>
        </div>
      )}

      {/* Main Form Box */}
      <form onSubmit={handleSubmit(onSubmit)} className="my-4">
        <div id="charBox" className="flex flex-col md:flex-row gap-5 w-full">
          {/* Left Column: Core Info & Stats */}
          <div className="border border-[var(--secondaryForeground)] shadow-lg flex-1 p-3 rounded flex flex-col gap-3 bg-[var(--secondary)]">
            <div className="text-md font-bold border-b pb-2">
              Core Information
            </div>

            <FormInput
              label="Character Name"
              name="name"
              register={register}
              errors={errors}
              rules={{ required: "Name is required." }}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormInput
                label="Race"
                name="race"
                register={register}
                errors={errors}
                rules={{ required: "Race is required." }}
              />
              <FormInput
                label="Class"
                name="class"
                register={register}
                errors={errors}
                rules={{ required: "Class is required." }}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <FormSelect
                label="Gender"
                name="gender"
                register={register}
                errors={errors}
                options={["male", "female"]}
                rules={{ required: "Gender is required." }}
              />
              <FormInput
                label="Level"
                name="level"
                type="number"
                register={register}
                errors={errors}
                rules={{
                  required: "Level is required.",
                  min: { value: 1, message: "Level must be 1 or greater." },
                  valueAsNumber: true,
                }}
              />
              <FormSelect
                label="Status"
                name="status"
                register={register}
                errors={errors}
                options={["alive", "dead"]}
                rules={{ required: "Status is required." }}
              />
            </div>

            {/* Core Stats */}
            <div className="space-y-3 pt-4 border-t mt-auto">
              <div className="text-md font-bold">Core Stats (Min 1)</div>
              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  label="Strength (STR)"
                  name="strength"
                  type="number"
                  register={register}
                  errors={errors}
                  rules={{
                    min: { value: 1, message: "Min 1" },
                    valueAsNumber: true,
                  }}
                />
                <FormInput
                  label="Intelligence (INT)"
                  name="intelligence"
                  type="number"
                  register={register}
                  errors={errors}
                  rules={{
                    min: { value: 1, message: "Min 1" },
                    valueAsNumber: true,
                  }}
                />
                <FormInput
                  label="Agility (AGI)"
                  name="agility"
                  type="number"
                  register={register}
                  errors={errors}
                  rules={{
                    min: { value: 1, message: "Min 1" },
                    valueAsNumber: true,
                  }}
                />
                <FormInput
                  label="Luck (LUC)"
                  name="luck"
                  type="number"
                  register={register}
                  errors={errors}
                  rules={{
                    min: { value: 1, message: "Min 1" },
                    valueAsNumber: true,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Description, Ability & Image */}
          <div className="border border-[var(--secondaryForeground)] shadow-lg flex-2 p-3 rounded flex flex-col gap-4 bg-[var(--secondary)]">
            {/* Image URL */}
            <FormInput
              label="Image URL"
              name="imageURL"
              register={register}
              errors={errors}
              placeholder="e.g., https://example.com/image.jpg (Optional)"
            />

            {/* Special Ability */}
            <div>
              <label
                htmlFor="special ability"
                className="font-semibold text-sm"
              >
                Special Ability (Optional)
              </label>
              <textarea
                id="special ability"
                {...register("special ability")}
                className="border p-2 rounded text-sm w-full h-20 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="A unique power or skill..."
              ></textarea>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="font-semibold text-sm">
                Description (Optional)
              </label>
              <textarea
                id="description"
                {...register("description")}
                className="border p-2 rounded text-sm w-full h-32 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="A brief background, personality, and appearance..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-auto bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200 disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Character"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCharacterPage;
