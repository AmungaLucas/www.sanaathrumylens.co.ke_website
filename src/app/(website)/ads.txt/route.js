export async function GET() {
    const adsTxt = `google.com, pub-8031704055036556, DIRECT, f08c47fec0942fa0`;

    return new Response(adsTxt, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}