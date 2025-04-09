// FULL Permissions.jsx with grouped view/edit shown only on 'Manage Permissions' and user search filters

import { useEffect, useState, Fragment } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../translations";
import { useAuth0 } from "@auth0/auth0-react";

const groupedPages = {
  Dashboard: ["dashboard", "accounts", "trades", "analysis", "history"],
  Reports: ["reports"],
  "Help Center": ["knowledgebase", "faq", "videotutorials", "contactsupport"],
  "AI Agent": ["workspace", "integration", "settings"],
};

const initialRoles = ["Admin", "Dealer", "Operations Analyst", "Marketing Officer"];

const Permissions = () => {
  const { language } = useLanguage();
  const { user } = useAuth0();
  const isAdmin = user?.email === "test4@test4.com";

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState(initialRoles);
  const [activeUserId, setActiveUserId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });
  const [newRoleName, setNewRoleName] = useState("");
  const [showAddRoleInput, setShowAddRoleInput] = useState(false);
  const [search, setSearch] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    setUsers([
      {
        id: 1,
        name: "Alex Trader",
        email: "alex@demo.com",
        roles: ["Dealer"],
        permissions: { dashboard: ["view"], trades: ["view", "edit"] },
      },
    ]);
  }, []);

  const togglePermission = (userId, page, perm) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const perms = new Set(u.permissions[page] || []);
        perms.has(perm) ? perms.delete(perm) : perms.add(perm);
        return { ...u, permissions: { ...u.permissions, [page]: [...perms] } };
      })
    );
  };

  const setGroupPermissions = (userId, group, type, value) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const updated = { ...u.permissions };
        groupedPages[group].forEach((page) => {
          const perms = new Set(updated[page] || []);
          value ? perms.add(type) : perms.delete(type);
          updated[page] = [...perms];
        });
        return { ...u, permissions: updated };
      })
    );
  };

  const handleAddUser = () => {
    const nextId = users.length + 1;
    setUsers([
      ...users,
      {
        id: nextId,
        name: newUser.name,
        email: newUser.email,
        roles: [newUser.role],
        permissions: {},
      },
    ]);
    setNewUser({ name: "", email: "", role: "" });
    setShowAddForm(false);
  };

  const handleAddRole = () => {
    const trimmed = newRoleName.trim();
    if (trimmed && !roles.includes(trimmed)) {
      setRoles([...roles, trimmed]);
    }
    setNewRoleName("");
    setShowAddRoleInput(false);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.name.toLowerCase()) &&
      u.email.toLowerCase().includes(search.email.toLowerCase()) &&
      (search.role === "" || u.roles.includes(search.role))
  );

  if (!isAdmin) return <div className="text-red-500 p-6">Unauthorized</div>;

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">
        {translations[language].permissions}
      </h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <input
          placeholder="Search by name"
          className="p-2 rounded bg-[#1d1d1d] border border-gray-600 text-white"
          value={search.name}
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
        />
        <input
          placeholder="Search by email"
          className="p-2 rounded bg-[#1d1d1d] border border-gray-600 text-white"
          value={search.email}
          onChange={(e) => setSearch({ ...search, email: e.target.value })}
        />
        <select
          className="p-2 rounded bg-[#1d1d1d] border border-gray-600 text-white"
          value={search.role}
          onChange={(e) => setSearch({ ...search, role: e.target.value })}
        >
          <option value="">All Roles</option>
          {roles.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          ➕ Add User
        </button>
      </div>

      {showAddForm && (
        <div className="bg-gray-800 p-4 rounded mb-4">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <input
              placeholder="Full Name"
              className="p-2 rounded bg-[#1d1d1d] border border-gray-600 text-white"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              placeholder="Email"
              className="p-2 rounded bg-[#1d1d1d] border border-gray-600 text-white"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <select
              className="p-2 rounded bg-[#1d1d1d] border border-gray-600 text-white"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="">Select Role</option>
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="col-span-3 flex items-center gap-3 mt-2">
            <button
              onClick={() => setShowAddRoleInput(!showAddRoleInput)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded"
            >
              ➕ Add Role
            </button>
            {showAddRoleInput && (
              <>
                <input
                  placeholder="New Role"
                  className="p-2 rounded bg-[#1d1d1d] border border-gray-600 text-white"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                />
                <button
                  onClick={handleAddRole}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
              </>
            )}
          </div>

          <button
            onClick={handleAddUser}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Save User
          </button>
        </div>
      )}

      {/* Users Table */}
      <table className="w-full text-sm border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
            <Fragment key={u.id}>
              <tr className="border-b border-gray-700">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.roles.join(", ")}</td>
                <td className="p-3">
                  <button
                    onClick={() => setActiveUserId(activeUserId === u.id ? null : u.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    {activeUserId === u.id ? "Hide" : "Manage Permissions"}
                  </button>
                </td>
              </tr>
              {activeUserId === u.id && (
                <tr>
                  <td colSpan="4">
                    <table className="w-full text-sm border border-gray-700">
                      <thead>
                        <tr className="text-left border-b border-gray-600">
                          <th className="p-2">Section / Page</th>
                          <th className="p-2">View</th>
                          <th className="p-2">Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(groupedPages).map(([group, pages]) => (
                          <Fragment key={group}>
                            <tr className="bg-gray-800">
                              <td className="p-2 font-bold">{group}</td>
                              <td className="p-2">
                                <input
                                  type="checkbox"
                                  onChange={(e) => setGroupPermissions(u.id, group, "view", e.target.checked)}
                                  checked={pages.every((p) => u.permissions[p]?.includes("view"))}
                                />
                              </td>
                              <td className="p-2">
                                <input
                                  type="checkbox"
                                  onChange={(e) => setGroupPermissions(u.id, group, "edit", e.target.checked)}
                                  checked={pages.every((p) => u.permissions[p]?.includes("edit"))}
                                />
                              </td>
                            </tr>
                            {pages.map((page) => (
                              <tr key={page} className="border-b border-gray-700">
                                <td className="p-2 capitalize pl-6">{translations[language][page] || page}</td>
                                <td className="p-2">
                                  <input
                                    type="checkbox"
                                    checked={u.permissions[page]?.includes("view") || false}
                                    onChange={() => togglePermission(u.id, page, "view")}
                                  />
                                </td>
                                <td className="p-2">
                                  <input
                                    type="checkbox"
                                    checked={u.permissions[page]?.includes("edit") || false}
                                    onChange={() => togglePermission(u.id, page, "edit")}
                                  />
                                </td>
                              </tr>
                            ))}
                          </Fragment>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Permissions;
