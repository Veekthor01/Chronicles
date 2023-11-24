const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function getBlogPosts(page = 1, limit = 1) {
  //await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 second
  const blogPostURL = `${backendUrl}/blogpost?page=${page}&limit=${limit}`;
  try {
    const response = await fetch(blogPostURL, {
      next: {
        revalidate: 0,
      },
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Response Status:', response.status);
    const data = await response.json();
    console.log('Parsed Data:', data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}