const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export async function hydrateSalesSession(session: {
  role?: string;
  salesPersonId: string;
  projectId: string;
  projectName: string;
}) {
  if (session.role !== "SALES" || !session.salesPersonId || !GRAPHQL_ENDPOINT) {
    return session;
  }

  if (session.projectId && session.projectName) {
    return session;
  }

  try {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetSalesPersonById($id: String!) {
            getSalesPersonById(id: $id) {
              projectId
              project { name }
            }
          }
        `,
        variables: { id: session.salesPersonId },
      }),
      cache: "no-store",
    });
    const json = await res.json();
    const person = json.data?.getSalesPersonById;
    if (person?.projectId) {
      return {
        ...session,
        projectId: person.projectId,
        projectName: person.project?.name ?? session.projectName,
      };
    }
  } catch {
    // keep existing session
  }

  return session;
}
