import React from 'react';

const AskQuestionNotice = () => {
    return (
        <>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-7 ">
  <div className="mb-4">
    <h2 className="text-lg font-bold text-gray-800 mb-2">How to Write a  Question</h2>
    <hr className="border-gray-400 border-1 w-full"></hr>
  </div>
  <ul className="list-disc list-inside">
    <li className="text-gray-700 mb-2"><span className="font-semibold">Be specific and concise:</span> Ask your question in a clear and concise manner, and try to provide as much specific detail as possible. This will make it easier for others to understand your question and provide a helpful answer.</li>
    <li className="text-gray-700 mb-2"><span className="font-semibold">Provide context:</span> Include any relevant context or background information that may be helpful in understanding your question. This could include code snippets, error messages, or specific requirements.</li>
    <li className="text-gray-700 mb-2"><span className="font-semibold">Use code formatting:</span> If you are including code snippets in your question, use code formatting to make them easier to read. You can do this by wrapping your code in backticks or by using a code block .</li>
    <li className="text-gray-700 mb-2"><span className="font-semibold">Check for duplicates:</span> Before asking your question, make sure to search the site to see if your question has already been asked and answered. This can save you time and ensure that you get the best possible answer.</li>
    <li className="text-gray-700 mb-2"><span className="font-semibold">Be polite and respectful:</span> Remember to be polite and respectful to others when asking your question. This will help create a positive and helpful community on the site.</li>
  </ul>
</div>

        </>
    );
};

export default AskQuestionNotice;