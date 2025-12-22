// import { Routes, Route } from "react-router-dom";
// import HealthGate from "./api/HealthGate";
// import RequireAuth from "./api/RequireAuth";
// import AppLayout from "./components/layout/AppLayout";
// import Login from "./components/pages/Login";
// import UploadPage from "./components/pages/UploadPage";

// export default function App() {
//   return (
//     <HealthGate>
//       <Routes>
//         {/* Public */}
//         <Route path="/" element={<Login />} />

//         {/* Protected */}
//         <Route
//           path="/upload"
//           element={
//             <RequireAuth>
//               <UploadPage />
//             </RequireAuth>
//           }
//         />
//       </Routes>
//     </HealthGate>
//   );
// }



import { Routes, Route } from "react-router-dom";

import HealthGate from "./api/HealthGate";
import RequireAuth from "./api/RequireAuth";

import AppLayout from "./components/layout/AppLayout";
import Login from "./components/pages/Login";
import UploadPage from "./components/pages/UploadPage";
import DocumentPreview from "./components/pages/DocumentPreview";
import Templates from "./components/pages/Templates";
import GenerateDocument from "./components/pages/GenerateDocument";
import GeneratedResult from "./components/pages/GeneratedResult";

export default function App() {
  return (
    <HealthGate>
      <Routes>
        {/* =====================
            Public Routes
        ====================== */}
        <Route path="/" element={<Login />} />

        {/* =====================
            Protected App Routes
        ====================== */}
        <Route
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route path="/upload" element={<UploadPage />} />

          {/* Future routes (uncomment when ready) */}
          <Route path="/preview" element={<DocumentPreview />} /> 
          <Route path="/templates" element={<Templates />} />
          <Route
          path="/generate/:templateId"
          element={
            <RequireAuth>
              <GenerateDocument />
            </RequireAuth>
          }
        />
          <Route path="/generated" element={ <RequireAuth><GeneratedResult /></RequireAuth>}/>

        </Route>
      </Routes>
    </HealthGate>
  );
}
