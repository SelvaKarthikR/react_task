<table>
  <thead>
    <tr>
      <th>{header}</th>
      <th>{role}</th>
      <th>Status</th>
      <th>data</th>
      <th>{action}</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user, index) => (
      <tr key={index}>
        <td>{user.name}</td>
        <td>{user.role}</td>
        <td>{user.status}</td>
        <td>{user.data}</td>
        <td>
          <button>Details</button>
          <button>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>;
