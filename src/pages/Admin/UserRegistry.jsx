import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/common/Navigation/AdminNavbar";
import UserRow from "../../components/UserRow";

import { getAllUsers } from "../../store/thunks/adminThunks";

function UserRegistry() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const { users, pagination, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(
      getAllUsers({
        page,
        limit: 10,
      }),
    );
  }, [dispatch, page]);

  if (loading && !users) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500 font-bold">Loading Events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex font-sans text-slate-900">
      <AdminSidebar />

      <main className="flex-1 overflow-x-hidden">
        <AdminNavbar />

        <div className="h-16 sm:h-28 lg:h-32 xl:h-20" />

        <div className="p-4 lg:p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900">
              User Registry
            </h2>

            <p className="text-slate-500">
              Comprehensive database of platform users.
            </p>
          </div>

          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            {loading ? (
              <div className="text-center py-10">
                <p className="text-slate-500 font-bold">Loading users...</p>
              </div>
            ) : (
              <>
                {users.map((user) => (
                  <UserRow
                    key={user._id}
                    name={user.fullName}
                    email={user.email}
                    tag={user.role}
                    member={user.isVerifiedOrganizer ? "Verified" : "Standard"}
                    meta={new Date(user.createdAt).toLocaleDateString()}
                  />
                ))}

                {pagination?.totalPages > 1 && (
                  <div className="flex justify-between items-center mt-8">
                    <button
                      disabled={!pagination?.hasPrevPage}
                      onClick={() => setPage((prev) => prev - 1)}
                      className="px-4 py-2 border rounded-lg disabled:opacity-50"
                    >
                      Previous
                    </button>

                    <span className="font-bold text-sm">
                      Page {pagination?.currentPage} of {pagination?.totalPages}
                    </span>

                    <button
                      disabled={!pagination?.hasNextPage}
                      onClick={() => setPage((prev) => prev + 1)}
                      className="px-4 py-2 border rounded-lg disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserRegistry;
