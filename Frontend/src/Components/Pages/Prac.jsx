import React from "react";

const Resume = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8 print:bg-white print:py-0 print:px-0">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 shadow-md rounded-sm print:shadow-none print:p-0">
        {/* HEADER */}
        <header className="text-center border-b-2 border-blue-600 pb-5 mb-6">
          <h1 className="text-3xl font-bold tracking-wide text-slate-900 uppercase mb-1">
            Varadraaj Agrawal
          </h1>
          <div className="text-md font-semibold tracking-wider text-blue-600 uppercase mb-3">
            Full-Stack Developer
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span>📍 Raipur, Chhattisgarh</span>
            <span>📱 +91 7999469783</span>
            <span>
              ✉️{" "}
              <a
                href="mailto:varadagrawal52@gmail.com"
                className="text-blue-600 hover:underline"
              >
                varadagrawal52@gmail.com
              </a>
            </span>
            <span>
              🔗{" "}
              <a
                href="https://github.com/SenseiVa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub Profile
              </a>
            </span>
          </div>
        </header>

        {/* SUMMARY */}
        <section className="mb-6 print:break-inside-avoid">
          <h2 className="text-base font-bold text-slate-900 uppercase border-b border-gray-200 pb-1 mb-3 tracking-wide">
            Summary
          </h2>
          <p className="text-sm text-gray-700 text-justify leading-relaxed">
            Passionate and detail-oriented Full-Stack Developer with a solid
            foundation in business administration (BBA) and an extensive
            technical toolkit across frontend and backend technologies. Adept at
            building fully responsive user interfaces using React.js and
            Next.js, alongside developing scalable backend services with
            Node.js, Express, and C#. Proven ability to architect clean database
            schemas, implement efficient indexing patterns, and write robust API
            validation systems to deliver highly optimized web applications.
          </p>
        </section>

        {/* TECHNICAL SKILLS */}
        <section className="mb-6 print:break-inside-avoid">
          <h2 className="text-base font-bold text-slate-900 uppercase border-b border-gray-200 pb-1 mb-3 tracking-wide">
            Technical Skills
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex flex-col sm:flex-row">
              <span className="font-bold text-slate-800 min-w-[180px]">
                Languages:
              </span>
              <span className="text-gray-700">
                JavaScript (ES6+), C#, HTML5, CSS3, SQL
              </span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="font-bold text-slate-800 min-w-[180px]">
                Frontend & Libraries:
              </span>
              <span className="text-gray-700">
                React.js, Next.js, Tailwind CSS, Redux Toolkit
              </span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="font-bold text-slate-800 min-w-[180px]">
                Backend & Runtimes:
              </span>
              <span className="text-gray-700">
                Node.js, Express.js, ASP.NET Core
              </span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="font-bold text-slate-800 min-w-[180px]">
                Databases & ORMs:
              </span>
              <span className="text-gray-700">
                MongoDB, Mongoose, SQL Server
              </span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="font-bold text-slate-800 min-w-[180px]">
                Tools & Workflows:
              </span>
              <span className="text-gray-700">
                Git, GitHub, RESTful APIs, JWT Auth, Postman, Vercel, Netlify
              </span>
            </div>
          </div>
        </section>

        {/* TECHNICAL PROJECTS */}
        <section className="mb-6 print:break-inside-avoid">
          <h2 className="text-base font-bold text-slate-900 uppercase border-b border-gray-200 pb-1 mb-3 tracking-wide">
            Technical Projects
          </h2>

          {/* Project 1 */}
          <div className="mb-5">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
              <h3 className="text-sm font-bold text-gray-800">
                Financial Transaction API & Validation Engine (Backend)
              </h3>
              <span className="text-xs font-medium text-blue-600 italic">
                Node.js, Express.js, MongoDB, Mongoose
              </span>
            </div>
            <ul className="list-disc ml-5 text-xs text-gray-700 space-y-1 text-justify">
              <li>
                Designed and implemented a robust RESTful backend module for
                transaction filtering, pagination, and sorting logic.
              </li>
              <li>
                Engineered custom schema architectures featuring single-field
                and advanced compound indexes (<code>user_1_createdAt_-1</code>)
                to optimize query execution plans, effectively replacing costly
                in-memory sort stages with high-performance index scans (
                <code>IXSCAN</code>).
              </li>
              <li>
                Developed a bulletproof query validation middleware handling
                complex date parsing strategies and self-correcting mathematical
                boundaries for minimum/maximum numeric ranges.
              </li>
            </ul>
          </div>

          {/* Project 2 */}
          <div className="mb-5">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
              <h3 className="text-sm font-bold text-gray-800">
                AI Chat Interface (Frontend)
              </h3>
              <span className="text-xs font-medium text-blue-600 italic">
                Next.js, JavaScript, Tailwind CSS
              </span>
            </div>
            <ul className="list-disc ml-5 text-xs text-gray-700 space-y-1 text-justify">
              <li>
                Built a sleek, single-page conversational UI highlighting modern
                UI/UX design components and responsive flexboxes.
              </li>
              <li>
                Optimized assets and streaming layouts for seamless rendering
                speeds across diverse mobile and desktop viewports.
              </li>
            </ul>
            <div className="text-xs font-medium mt-1 ml-5">
              <span>
                🔗 Live Link:{" "}
                <a
                  href="https://66702596ee25650091ba56a7--fabulous-custard-4b52dc.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  fabulous-custard-4b52dc.netlify.app
                </a>
              </span>
            </div>
          </div>

          {/* Project 3 */}
          <div className="mb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
              <h3 className="text-sm font-bold text-gray-800">
                Yoga Wellness Platform (Frontend)
              </h3>
              <span className="text-xs font-medium text-blue-600 italic">
                Next.js, React.js, Tailwind CSS, Git
              </span>
            </div>
            <ul className="list-disc ml-5 text-xs text-gray-700 space-y-1 text-justify">
              <li>
                Designed and deployed a fully responsive multi-page presentation
                website utilizing Next.js's component-driven architecture.
              </li>
              <li>
                Managed clean system state and semantic structures to minimize
                component re-renders while ensuring structural fluid styling via
                Tailwind utility classes.
              </li>
            </ul>
            <div className="text-xs font-medium mt-1 ml-5">
              <span>
                🔗 Code Link:{" "}
                <a
                  href="https://github.com/SenseiVa/Yoga-Wellness-.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  github.com/SenseiVa/Yoga-Wellness-
                </a>
              </span>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="mb-6 print:break-inside-avoid">
          <h2 className="text-base font-bold text-slate-900 uppercase border-b border-gray-200 pb-1 mb-3 tracking-wide">
            Professional Experience
          </h2>
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
              <h3 className="text-sm font-bold text-gray-800">
                Edzu Edtech —{" "}
                <span className="font-normal italic text-gray-600">
                  Investment Analysis Intern
                </span>
              </h3>
              <span className="text-xs font-medium text-gray-500">
                June 2023 – July 2023
              </span>
            </div>
            <ul className="list-disc ml-5 text-xs text-gray-700 space-y-1 text-justify">
              <li>
                Assisted senior analysts in evaluating investment projects,
                conducting cross-functional market research, and modeling
                financial data.
              </li>
              <li>
                Acquired experience managing and optimizing mock investment
                portfolios, sharpening quantitative problem-solving skills that
                map directly to application business logic.
              </li>
            </ul>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="mb-6 print:break-inside-avoid">
          <h2 className="text-base font-bold text-slate-900 uppercase border-b border-gray-200 pb-1 mb-3 tracking-wide">
            Education
          </h2>
          <div className="space-y-3">
            <div>
              <div class="flex justify-between items-baseline">
                <h3 className="text-sm font-bold text-gray-800">
                  Bachelor of Business Administration (BBA)
                </h3>
                <span className="text-xs font-medium text-gray-500">
                  Graduation Year: 2024
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-0.5">Raipur, India</div>
            </div>
            <div>
              <div class="flex justify-between items-baseline">
                <h3 className="text-sm font-bold text-gray-800">
                  Higher Secondary Education (Commerce) —{" "}
                  <span className="font-normal text-gray-600">
                    Delhi Public School
                  </span>
                </h3>
                <span className="text-xs font-medium text-gray-500">
                  Graduation Year: 2021
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-0.5">Raipur, India</div>
            </div>
          </div>
        </section>

        {/* EXTRA-CURRICULAR */}
        <section className="print:break-inside-avoid">
          <h2 className="text-base font-bold text-slate-900 uppercase border-b border-gray-200 pb-1 mb-3 tracking-wide">
            Extracurricular Achievement & Leadership
          </h2>
          <ul className="list-disc ml-5 text-xs text-gray-700 space-y-1">
            <li>
              <strong>National Football Tournament:</strong> Represented state
              and school at the national competitive level.
            </li>
            <li>
              <strong>All India Inter-University Football Tournament:</strong>{" "}
              Selected to compete in rigorous inter-university athletic
              circuits, demonstrating high teamwork, communication, and
              discipline under pressure.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Resume;
