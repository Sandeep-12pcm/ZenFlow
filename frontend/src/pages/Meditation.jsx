import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Meditation = () => {
  // State to manage checkboxes
  const [steps, setSteps] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
    step7: false,
  });

  const navigate = useNavigate(); // Hook to navigate to a new route

  const handleStepChange = (step) => {
    setSteps({
      ...steps,
      [step]: !steps[step],
    });
  };

  const handleStartMeditation = () => {
    // Navigate to the meditation guide page
    navigate("/meditation-guide");
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-center mb-4">Meditation Steps</h2>

      <div className="space-y-4">
        {/* Step 1 */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="step1"
            checked={steps.step1}
            onChange={() => handleStepChange("step1")}
            className="w-6 h-6 text-indigo-600"
          />
          <label htmlFor="step1" className="ml-2 text-lg">
            Find a Quiet and Comfortable Space
          </label>
        </div>

        {/* Step 2 */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="step2"
            checked={steps.step2}
            onChange={() => handleStepChange("step2")}
            className="w-6 h-6 text-indigo-600"
          />
          <label htmlFor="step2" className="ml-2 text-lg">
            Set Your Intention
          </label>
        </div>

        {/* Step 3 */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="step3"
            checked={steps.step3}
            onChange={() => handleStepChange("step3")}
            className="w-6 h-6 text-indigo-600"
          />
          <label htmlFor="step3" className="ml-2 text-lg">
            Adopt a Comfortable Posture
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="step4"
            checked={steps.step4}
            onChange={() => handleStepChange("step4")}
            className="w-6 h-6 text-indigo-600"
          />
          <label htmlFor="step4" className="ml-2 text-lg">
            Scan Your Body for Tension
          </label>
        </div>


        <div className="flex items-center">
          <input
            type="checkbox"
            id="step5"
            checked={steps.step5}
            onChange={() => handleStepChange("step5")}
            className="w-6 h-6 text-indigo-600"
          />
          <label htmlFor="step5" className="ml-2 text-lg">
            Focus on Your Natural Breath
          </label>
        </div>

        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="step6"
            checked={steps.step6}
            onChange={() => handleStepChange("step6")}
            className="w-6 h-6 text-indigo-600"
          />
          <label htmlFor="step6" className="ml-2 text-lg">
            Let Go of Expectations
          </label>
        </div>

        {/* Step 4 */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="step7"
            checked={steps.step7}
            onChange={() => handleStepChange("step7")}
            className="w-6 h-6 text-indigo-600"
          />
          <label htmlFor="step7" className="ml-2 text-lg">
            Start your meditation session
          </label>
        </div>

        {/* Start Meditation Button */}
        <button
          onClick={handleStartMeditation}
          className="w-full bg-indigo-600 text-white py-2 rounded-md mt-6"
        >
          Start Meditation
        </button>
      </div>
    </div>
  );
};

export default Meditation;
