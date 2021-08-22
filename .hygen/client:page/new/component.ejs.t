---
to: apps/client/pages/<%= name.toLowerCase() %>.tsx
---

import type { NextPage } from 'next';

export const <%= name %>: NextPage = () => {
  return <p><%= name %></p>;
};

export default <%= name %>;
