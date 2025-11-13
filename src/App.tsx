import { useState } from 'react';
import { Phone, Send } from 'lucide-react';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber || phoneNumber.length !== 10) {
      setMessage({ type: 'error', text: 'Please enter exactly 10 digits' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('https://n8n.srv743759.hstgr.cloud/webhook/customerdetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          number: phoneNumber,
          first_name: "Gaurav",
          last_name: "Vishwakarma",
          call_attempted: "No",
          project_id: "anandvan",
          UID: "x123z",
          callback_url: "https://integrationcloud-in21.leadsquaredapps.com/v1/webhook/lsq/77688/115/625ae29d-b12a-4e3e-9702-0e13f698c42d/b8eafeda-82ac-4d92-a678-22c999d2d5c5/d033544f-eee6-48f7-a3b8-e05183206c86?ickey=ebfb57933baa60d07bf705dcdbedc8ef03561e75f8b3882b35fa5f3fdba3b6fea07a8f1c74685c9c9717bd3aced24d9bcbf8edc29c767f3b4e0cb5f2468cf264e22a10333d4b2127adfc32953fca6e3ef69345ff300818c66c273a3db8289ee9a1baf0c56fea9faf",
          environment: "Test",
          campaign_id: "SDDSD",
          model_identifier: "xxxx",
          refernce_data: "Local"
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Call initiated for Anandvan Villas' });
        setPhoneNumber('');
      } else {
        setMessage({ type: 'error', text: 'Failed to initiate call. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please check your connection.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-500 rounded-full p-3">
              <Phone className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Phone Number Registration
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Enter your phone number to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 10-digit number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                maxLength={10}
                pattern="[0-9]{10}"
                disabled={isSubmitting}
                required
              />
            </div>

            {message && (
              <div className={`p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                'Submitting...'
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
