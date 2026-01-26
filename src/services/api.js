export const searchPerson = async (searchParams) => {
    // ---------------------------------------------------------------------------
    // 🚧 STEP 1: PASTE YOUR N8N WEBHOOK URL HERE
    // ---------------------------------------------------------------------------
    // Example: "https://n8n.your-domain.com/webhook-test/person-finder"
    const N8N_WEBHOOK_URL = "https://wajid7.app.n8n.cloud/webhook-test/person-finder";

    // ---------------------------------------------------------------------------
    // 🚦 STEP 2: SET THIS TO 'true' TO USE REAL N8N BACKEND
    // ---------------------------------------------------------------------------
    const USE_REAL_BACKEND = true;


    console.log("Initiating Search:", searchParams);

    if (USE_REAL_BACKEND && N8N_WEBHOOK_URL) {
        try {
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(searchParams)
            });

            if (!response.ok) throw new Error("Network response was not ok");

            const data = await response.json();

            // 🛡️ Robust Response Handling
            // If N8N returns { results: [...] } (Best Practice)
            if (data.results && Array.isArray(data.results)) return data.results;

            // If N8N returns [...] (Direct Array)
            if (Array.isArray(data)) return data;

            // If N8N returns { data: [...] }
            if (data.data && Array.isArray(data.data)) return data.data;

            // If single object, wrap it
            return [data];

        } catch (error) {
            console.error("N8N Error:", error);
            throw error; // Let App.jsx handle the error UI
        }
    }

    // ---------------------------------------------------------------------------
    // 🧪 MOCK DATA (Fallback)
    // ---------------------------------------------------------------------------
    console.log("Using Mock Data...");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    name: searchParams.query || "John Doe",
                    title: "Senior Software Engineer at Google",
                    link: "https://linkedin.com/in/johndoe",
                    source: "LinkedIn",
                    description: "Passionate engineer with 10+ years of experience in distributed systems and AI. Alumnus of Stanford University.",
                    location: searchParams.location || "San Francisco, CA"
                },
                {
                    name: searchParams.query || "John Doe",
                    title: "Product Manager",
                    link: "https://linkedin.com/in/johndoe2",
                    source: "LinkedIn",
                    description: "Building the future of fintech. Previously at Stripe and PayPal.",
                    location: "New York, NY"
                },
                {
                    name: searchParams.query || "John Doe",
                    title: "Profile",
                    link: "https://facebook.com/johndoe",
                    source: "Facebook",
                    description: "Lives in San Francisco. Studied at Stanford.",
                    location: "San Francisco, CA"
                },
                {
                    name: `${searchParams.query || "John"} D.`,
                    title: "@johndoe",
                    link: "https://twitter.com/johndoe",
                    source: "Twitter",
                    description: "Tech enthusiast. Python lover. Views are my own. #coding #life",
                    location: "Global"
                },
                {
                    name: "JD Dev",
                    title: "@jd_dev",
                    link: "https://twitter.com/jd_dev",
                    source: "Twitter",
                    description: "Building cool stuff 24/7.",
                    location: "Remote"
                }
            ]);
        }, 1000);
    });
};
