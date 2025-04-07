import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../translations";
import { useAuth0 } from "@auth0/auth0-react";

const pages = [
  "dashboard",
  "accounts",
  "trades",
  "analysis",
  "history",
  "reports",
  "settings",
  "integration",
  "workspace",
  "billing"
];

const roles = ["Admin", "Dealer", "Operations Analyst", "Marketing Officer"];

const Permissions = () => {
  const { language } = useLanguage();
  const { user } = useAuth0();
  const isAdmin = user?.email === "test4@test4.com";

  const [users, setUsers] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);

  const [search, setSearch] = useState({
    name: "",
    email: "",
    role: ""
  });

  useEffect(() => {
    setUsers([
      {
        id: 1,
        name: "Alex Trader",
        email: "alex@demo.com",
        roles: ["Dealer"],
        permissions: { dashboard: ["view"], trades: ["view", "edit"] }
      },
      {
        id: 2,
        name: "Maria Ops",
        email: "maria@demo.com",
        roles: ["Operations Analyst"],
        permissions: { accounts: ["view"], analysis: ["view"] }
      },
      {
        id: 3,
        name: "Michael Marketer",
        email: "michael@demo.com",
        roles: ["Marketing Officer"],
        permissions: {}
      }
    ]);
  }, []);

  const togglePermission = (userId, page, perm) => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id !== userId) return u;
        const perms = new Set(u.permissions[page] || []);
        perms.has(perm) ? perms.delete(perm) : perms.add(perm);
        return { ...u, permissions: { ...u.permissions, [page]: [...perms] } };
      })
    );
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.name.toLowerCase()) &&
    u.email.toLowerCase().includes(search.email.toLowerCase()) &&
    (search.role === "" || u.roles.includes(search.role))
  );

  if (!isAdmin) return <div className="text-red-500 p-6">Unauthorized</div>;

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">{translations[language].permissions}</h2>

      {/* Filters aligned with columns */}
      <div className="flex gap-4 mb-4">
        <input
          placeholder={translations[language].searchName}
          className="w-[25%] p-2 rounded bg-[#1d1d1d] border border-gray-600 text-white"
          value={search.name}
          onChange={e => setSearch({ ...search, name: e.target.value })}
        />
        <input
          placeholder={translations[language].searchEmail}
          className="w-[25%] p-2 rounded bg-[#1d1d1d] border border-gray-600 text-white"
          value={search.email}
          onChange={e => setSearch({ ...search, email: e.target.value })}
        />
        <select
          className="w-[25%] p-2 rounded bg-[#1d1d1d] border border-gray-600 text-white"
          value={search.role}
          onChange={e => setSearch({ ...search, role: e.target.value })}
        >
          <option value="">{translations[language].allRoles}</option>
          {roles.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <table className="w-full text-sm mb-6 border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-3 text-left">{translations[language].contactName}</th>
            <th className="p-3 text-left">{translations[language].contactEmail}</th>
            <th className="p-3 text-left">{translations[language].roles}</th>
            <th className="p-3 text-left">{translations[language].actions}</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(u => (
            <>
              <tr key={u.id} className="border-b border-gray-700">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.roles.join(", ")}</td>
                <td className="p-3">
                  <button
                    onClick={() => setActiveUserId(activeUserId === u.id ? null : u.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    {activeUserId === u.id ? translations[language].hide : translations[language].managePermissions}
                  </button>
                </td>
              </tr>
              {activeUserId === u.id && (
                <tr>
                  <td colSpan="4" className="bg-gray-900 p-4">
                    <table className="w-full text-sm border border-gray-700">
                      <thead>
                        <tr className="text-left border-b border-gray-600">
                          <th className="p-2">Page</th>
                          <th className="p-2">View</th>
                          <th className="p-2">Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pages.map(page => (
                          <tr key={page} className="border-b border-gray-700">
                            <td className="p-2 capitalize">{translations[language][page] || page}</td>
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
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Permissions;
