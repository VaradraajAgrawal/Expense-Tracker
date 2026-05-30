import React from "react";

export default function ShradhanjaliCard() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-200 font-sans antialiased">
      {/* Card Wrapper (Optimized for Portrait Share/Print) */}
      <div
        className="w-[750px] min-h-[1050px] p-8 shadow-2xl relative text-[#4a1525]"
        style={{
          backgroundColor: "#fdfbf7",
          backgroundImage: "radial-gradient(#f4efe6 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          border: "4px double #851c1c",
        }}
      >
        {/* Top Decorative Accent */}
        <div className="text-center text-xl text-[#851c1c] tracking-widest mb-2">
          ❖ ═══════ ❖ ═══════ ❖
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold tracking-wide text-[#851c1c] font-serif">
            ।। श्रीमननारायण ।।
          </h1>
        </div>

        {/* Main Body Grid (Photo Left, Text Right) */}
        <div className="grid grid-cols-12 gap-6 items-center mb-8">
          {/* Left Side: Photo Frame Placeholder */}
          <div className="col-span-5 flex flex-col items-center justify-center">
            <div className="w-48 h-64 border-4 border-[#851c1c] rounded-t-full rounded-b-lg overflow-hidden shadow-md bg-amber-50 flex items-center justify-center relative p-1">
              {/* Replace src with the final path to the high-res profile picture */}
              <img
                src="https://via.placeholder.com/200x300?text=Insert+Photo+Here"
                alt="Late Shri Govind Prasad Agrawal"
                className="w-full h-full object-cover rounded-t-full rounded-b-sm"
              />
            </div>
            <span className="text-xs text-gray-400 mt-2 italic">
              [ High-Res Photo Path ]
            </span>
          </div>

          {/* Right Side: Obituary Announcement */}
          <div className="col-span-7 text-center pr-4">
            <p className="text-lg font-medium text-gray-800 mb-2">
              अत्यंत दुःख के साथ सूचित कर रहे हैं कि हमारे पूज्य पिताजी
            </p>
            <h2 className="text-4xl font-bold text-[#851c1c] my-3 drop-shadow-sm font-serif">
              श्री गोविंद प्रसाद अग्रवाल
            </h2>
            <p className="text-xl font-semibold text-gray-700 mb-4">
              (करगी रोड वाले)
            </p>
            <div className="w-24 h-[1px] bg-[#851c1c] mx-auto my-3"></div>
            <p className="text-lg text-gray-800 leading-relaxed">
              का स्वर्गवास दिनांक <br />
              <span className="font-bold text-xl text-[#851c1c]">
                25 मई 2026, दिन सोमवार
              </span>{" "}
              <br />
              को हो गया है।
            </p>
          </div>
        </div>

        {/* Event Details Box (Terahvin / Ganga Prasadi) */}
        <div className="border-2 border-[#851c1c]/44 rounded-xl p-6 bg-[#fffdfa] shadow-sm mb-6 relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#fdfbf7] px-4">
            <h3 className="text-2xl font-bold text-[#851c1c] font-serif">
              बारहवां एवं गंगाप्रसादि
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-2 divide-x divide-[#851c1c]/20">
            {/* Left Column: Dates & Timing */}
            <div className="space-y-3 pr-2">
              <h4 className="text-xl font-bold border-b border-[#851c1c]/10 pb-1 text-[#851c1c]">
                बारहवां
              </h4>
              <p className="text-md">
                <span class="font-semibold">दिनांक:</span> 06 जून 2026, दिन
                शनिवार
              </p>
              <div className="text-md space-y-1">
                <p className="font-semibold text-gray-800">समय:</p>
                <div className="bg-amber-50 p-1.5 rounded border border-amber-200 text-sm text-center">
                  <span className="font-bold">01:00 बजे से 03:00 बजे तक</span>
                  <br />
                  (गंगा प्रसादी)
                </div>
                <p className="text-sm font-semibold mt-1">
                  सायं 04:00 बजे – पगड़ी रस्म
                </p>
              </div>
            </div>

            {/* Right Column: Location/Venue */}
            <div className="space-y-3 pl-6">
              <h4 className="text-xl font-bold border-b border-[#851c1c]/10 pb-1 text-[#851c1c] flex items-center gap-1">
                📍 कार्यक्रम स्थल
              </h4>
              <p className="text-sm text-gray-600 font-semibold">
                बारहवां एवं गंगा प्रसादी कार्यक्रम स्थल:
              </p>
              <p className="text-lg font-bold text-gray-900 leading-snug">
                श्री रामनाथ भीमसेन भवन,
              </p>
              <p className="text-md text-gray-700">समता कॉलोनी, रायपुर</p>
            </div>
          </div>
        </div>

        {/* Daily Shok Baithak & Residence Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Shok Baithak */}
          <div className="border border-[#851c1c]/30 rounded-lg p-4 bg-[#fffdfa]">
            <h4 className="text-lg font-bold text-[#851c1c] border-b border-[#851c1c]/10 pb-1 mb-2 text-center">
              दैनिक शोक बैठक
            </h4>
            <div className="text-sm space-y-1.5 text-center">
              <p>
                <span className="font-semibold">प्रतिदिन:</span> सायं 05:00 बजे
                से 07:00 बजे तक
              </p>
              <p className="bg-amber-50/60 py-1 rounded font-medium text-[#851c1c]">
                गरुड़ पुराण – सायं 04:30 बजे
              </p>
            </div>
          </div>

          {/* Residence */}
          <div className="border border-[#851c1c]/30 rounded-lg p-4 bg-[#fffdfa]">
            <h4 className="text-lg font-bold text-[#851c1c] border-b border-[#851c1c]/10 pb-1 mb-2 text-center">
              निवास
            </h4>
            <p className="text-sm text-center font-medium text-gray-800 leading-relaxed">
              गोकुल निवास, राधा कृष्ण मंदिर के सामने,
              <br />
              समता कॉलोनी, रायपुर
            </p>
          </div>
        </div>

        {/* Separation Line */}
        <div className="w-full h-[1px] bg-[#851c1c]/30 my-4" />

        {/* Family Acknowledgments Footer */}
        <div className="grid grid-cols-3 gap-4 text-center text-sm mb-6 bg-amber-50/40 p-4 rounded-xl border border-amber-100">
          {/* Column 1 */}
          <div className="space-y-1 border-r border-[#851c1c]/10">
            <h5 className="font-bold text-md text-white mb-1 bg-[#851c1c] py-0.5 rounded">
              शोक संतप्त
            </h5>
            <p className="font-semibold text-gray-900">
              आनंद अग्रवाल{" "}
              <span className="text-xs text-gray-500">(पुत्र)</span>
            </p>
            <p className="font-semibold text-gray-900">
              प्रकाश अग्रवाल <span class="text-xs text-gray-500">(पुत्र)</span>
            </p>
            <p className="text-gray-700">
              विशेष, अवधेश{" "}
              <span className="text-xs text-gray-500">(पौत्र)</span>
            </p>
            <p className="text-gray-700">
              वरदराज, वंशराज{" "}
              <span className="text-xs text-gray-500">(पौत्र)</span>
            </p>
          </div>

          {/* Column 2 */}
          <div className="space-y-1 border-r border-[#851c1c]/10 flex flex-col justify-between">
            <div>
              <h5 className="font-bold text-md text-white mb-1 bg-[#851c1c] py-0.5 rounded">
                शोकाकुल
              </h5>
              <p className="font-semibold text-gray-900 mt-2">
                मुरारी लाल अग्रवाल
              </p>
              <p className="text-gray-700">एवं समस्त परिवार</p>
            </div>
          </div>

          {/* Column 3 */}
          <div>
            <h5 className="font-bold text-md text-white mb-1 bg-[#851c1c] py-0.5 rounded">
              समस्त संबंधी
            </h5>
            <p className="font-bold text-gray-900">तुलस्यान परिवार</p>
            <p className="text-xs font-semibold text-gray-600">
              (करगी रोड वाले)
            </p>
            <p className="text-gray-700 mt-1">एवं समस्त परिजन</p>
          </div>
        </div>

        {/* Contact Numbers Contact Button */}
        <div className="text-center mt-6">
          <p className="inline-block bg-[#851c1c] text-white px-6 py-1.5 rounded-full text-md font-semibold tracking-wide shadow-sm">
            📞 संपर्क सूत्र: 9425502242, 9425502642
          </p>
        </div>

        {/* Bottom Decorative Accent */}
        <div className="text-center text-xl text-[#851c1c] tracking-widest mt-6">
          ❖ ═══════ ❖ ═══════ ❖
        </div>
      </div>
    </div>
  );
}
