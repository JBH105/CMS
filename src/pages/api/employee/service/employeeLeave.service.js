import employeeLeave from "../model/employeeLeave.model";

export const createLeaveService = async (data, user) => {
    if (user.role !== "employee") {
        throw new Error("Only employee can apply leave");
    }
    if (!user.companyId) {
        throw new Error("Employee is not linked to any company");
    }
    const newLeave = await employeeLeave.create({
        companyId: user.companyId,
        employeeId: user.id,
        ...data,
    });
    return newLeave;
};

export const getLeaveService = async (user) => {
    if (user.role === "company") {
        return await employeeLeave.find({
            companyId: user.id,
        });
    }
    if (user.role === "employee") {
        return await employeeLeave.find({
            employeeId: user.id,
        });
    }
    throw new Error("Unauthorized user");
};

export const updateLeaveStatusService = async (id, status, user) => {
    if (user.role !== "admin") {
        throw new Error("Only admin can approve/reject");
    }
    const updated = await employeeLeave.findByIdAndUpdate(id, { status }, { new: true });
    return updated;
};

export const leaveCountService = async () => {
    const now = new Date();

    const totalLeaves = await employeeLeave.countDocuments()
    const approvedLeave = await employeeLeave.countDocuments({ status: "approved" });
    const pendingLeave = await employeeLeave.countDocuments({ status: "pending" });
    const rejectedLeave = await employeeLeave.countDocuments({ status: "rejected" });

    const startOfDay = new Date(now.setHours(0, 0, 0, 0));   // today count
    const todayCount = await employeeLeave.countDocuments({
        createdAt: { $gte: startOfDay },
    });

    const currentDay = now.getDay();   // weekly count
    const diffToMonday = currentDay === 0 ? 6 : currentDay - 1;
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - diffToMonday);
    weekStart.setHours(0, 0, 0, 0);
    const weeklyCount = await employeeLeave.countDocuments({
        createdAt: { $gte: weekStart },
    });

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);  // monthly count
    const monthCount = await employeeLeave.countDocuments({
        createdAt: { $gte: monthStart },
    });

    const yearStart = new Date(now.getFullYear(), 0, 1);   // yearly count
    const yearCount = await employeeLeave.countDocuments({
        createdAt: { $gte: yearStart },
    });

    return {
        totalLeaves, approvedLeave, pendingLeave, rejectedLeave,
        todayLeave: todayCount,
        weeklyCount: weeklyCount,
        monthlyLeave: monthCount,
        yearlyLeave: yearCount,
    };
};