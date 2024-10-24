import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import AuthRouteProtection from "./protectedRoutes/AuthRouteProtection";
import AdminLayout from "./layout/AdminLayout";

import AdminLogin from "../features/admin/pages/AdminLogin";
const NotFound = lazy(() => import("../components/common/NotFound"));
const RequestedCourses = lazy(() =>
  import("../features/admin/pages/RequestedCourses")
);
const AdminRequestedCategory = lazy(() =>
  import("@/features/admin/pages/AdminRequestedCategory")
);
const AdminSalesReport = lazy(() =>
  import("@/features/salesReport/pages/AdminSalesReport")
);
const AdminDashboard = lazy(() =>
  import("../features/dashboard/pages/AdminDashboard")
);
const AdminStudent = lazy(() => import("../features/admin/pages/AdminStudent"));
const AdminTutor = lazy(() => import("../features/admin/pages/AdminTutor"));
const AdminCourse = lazy(() => import("../features/admin/pages/AdminCourse"));
const AdminTutorDetails = lazy(() =>
  import("../features/admin/pages/AdminTutorDetails")
);
const AdminCategory = lazy(() =>
  import("../features/admin/pages/AdminCategory")
);
const AdminCourseDetails = lazy(() =>
  import("../features/admin/pages/AdminCourseDetails")
);

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="login"
        element={
          <AuthRouteProtection element={<AdminLogin />} redirectTo={"/admin"} />
        }
      />

      <Route
        path=""
        element={
          <ProtectedRoute
            element={
              <AdminLayout>
                <Suspense fallback={<div>loading</div>}>
                  <AdminDashboard />
                </Suspense>
              </AdminLayout>
            }
            role={"admin"}
          />
        }
      />
      <Route
        path="student"
        element={
          <ProtectedRoute
            element={
              <AdminLayout>
                <Suspense fallback={<div>loading....</div>}>
                  <AdminStudent />
                </Suspense>
              </AdminLayout>
            }
            role={"admin"}
          />
        }
      />

      <Route
        path="tutor"
        element={
          <ProtectedRoute
            element={
              <AdminLayout>
                <Suspense fallback={<div>loading....</div>}>
                  <AdminTutor />
                </Suspense>
              </AdminLayout>
            }
            role={"admin"}
          />
        }
      />

      <Route
        path="tutor/:id"
        element={
          <ProtectedRoute
            element={
              <AdminLayout>
                <Suspense fallback={<div>loading....</div>}>
                  <AdminTutorDetails />
                </Suspense>
              </AdminLayout>
            }
            role={"admin"}
          />
        }
      />

      <Route
        path="courses"
        element={
          <ProtectedRoute
            element={
              <AdminLayout>
                <Suspense fallback={<div>loading....</div>}>
                  <AdminCourse />
                </Suspense>
              </AdminLayout>
            }
            role={"admin"}
          />
        }
      />

      <Route
        path="course/:slug"
        element={
          <ProtectedRoute
            element={
              <AdminLayout>
                <Suspense fallback={<div>loading....</div>}>
                  <AdminCourseDetails />
                </Suspense>
              </AdminLayout>
            }
            role={"admin"}
          />
        }
      />

      <Route
        path="course/requested"
        element={
          <ProtectedRoute
            element={
              <AdminLayout>
                <Suspense fallback={<div>loading....</div>}>
                  <RequestedCourses />{" "}
                </Suspense>
              </AdminLayout>
            }
            role={"admin"}
          />
        }
      />

      <Route
        path="category"
        element={
          <ProtectedRoute
            element={
              <AdminLayout>
                <Suspense fallback={<div>loading....</div>}>
                  <AdminCategory />{" "}
                </Suspense>
              </AdminLayout>
            }
            role={"admin"}
          />
        }
      />

      <Route
        path="requested-category"
        element={
          <ProtectedRoute
            element={
              <AdminLayout>
                <Suspense fallback={<div>loading....</div>}>
                  <AdminRequestedCategory />{" "}
                </Suspense>
              </AdminLayout>
            }
            role={"admin"}
          />
        }
      />

      <Route
        path="sales-report"
        element={
          <ProtectedRoute
            element={
              <AdminLayout>
                <Suspense fallback={<div>loading</div>}>
                  <AdminSalesReport />{" "}
                </Suspense>
              </AdminLayout>
            }
            role={"admin"}
          />
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
