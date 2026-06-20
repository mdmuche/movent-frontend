import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
} from "../../store/thunks/notificationsThunks";


import { Trash2, CheckCheck } from "lucide-react";
import Navbar from "../../components/common/Navigation/Navbar";
import Footer from "../../components/common/Footer";

function Notifications() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);

    const { notifications, loading, pagination } = useSelector(
        (state) => state.notifications,
    );

    useEffect(() => {
        dispatch(getNotifications({ page, limit: 10 }));
    }, [dispatch, page]);

    const handleMarkRead = (id) => {
        dispatch(markAsRead(id));
    };

    const handleDelete = (id) => {
        dispatch(deleteNotification(id));
    };

    const handleMarkAll = () => {
        dispatch(markAllAsRead());
    };

    return (
        <>
            <Navbar />

            <main className="bg-[#f1f5f9]">
                <div />

                <div className="p-6 lg:p-10 max-w-[1200px] mx-auto">

                    {/* Head*/}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-3xl font-black">Notifications</h2>
                            <p className="text-slate-500 text-sm">
                                Stay updated with system activity
                            </p>
                        </div>

                        {notifications.length > 0 && (
                            <button
                                onClick={handleMarkAll}
                                className="bg-white border px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-50"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    {/* List */}
                    <div className="space-y-3">
                        {notifications.length > 0 ? (notifications.map((n) => (
                            <div
                                key={n._id}
                                className={`flex justify-between items-start p-4 rounded-xl border bg-white shadow-sm ${n.isRead ? "opacity-70" : "border-l-4 border-[#00C950]"
                                    }`}
                            >
                                <div>
                                    <h4 className="font-bold text-sm">{n.title}</h4>
                                    <p className="text-xs text-slate-500 mt-1">
                                        {n.message}
                                    </p>

                                    <p className="text-[10px] text-slate-400 mt-2">
                                        {new Date(n.createdAt).toLocaleString()}
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    {!n.isRead && (
                                        <button
                                            onClick={() => handleMarkRead(n._id)}
                                            className="p-2 rounded-lg hover:bg-slate-100"
                                        >
                                            <CheckCheck size={16} />
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleDelete(n._id)}
                                        className="p-2 rounded-lg hover:bg-red-50 text-red-500"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))) : (
                            <p className="text-center text-slate-500 mt-10">No notifications</p>)
                        }
                    </div>

                    {/* Pagination */}
                    {pagination?.pages > 1 && (
                        <div className="flex justify-between mt-6">
                            <button
                                disabled={!pagination?.hasPrevPage}
                                onClick={() => setPage((p) => p - 1)}
                                className="px-4 py-2 border rounded-lg disabled:opacity-50"
                            >
                                Prev
                            </button>

                            <span className="text-sm font-bold">
                                Page {pagination?.page} of {pagination?.pages}
                            </span>

                            <button
                                disabled={!pagination?.hasNextPage}
                                onClick={() => setPage((p) => p + 1)}
                                className="px-4 py-2 border rounded-lg disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}

                    {loading && (
                        <p className="text-center text-slate-500 mt-10">
                            Loading notifications...
                        </p>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Notifications;