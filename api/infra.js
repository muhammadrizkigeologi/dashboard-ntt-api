export default async function handler(req, res) {
    const arcgisUrl =
        "https://sigi.pu.go.id/serverpu/rest/services/Hosted/" +
        "Sebaran_Infrastruktur_Terdampak/FeatureServer/0/query" +
        "?where=1%3D1" +
        "&outFields=*" +
        "&returnGeometry=true" +
        "&f=geojson";

    try {
        const response = await fetch(arcgisUrl);

        if (!response.ok) {
            throw new Error(`ArcGIS error: ${response.status}`);
        }

        const data = await response.json();

        res.setHeader(
            "Access-Control-Allow-Origin",
            "*"
        );

        return res.status(200).json(data);

    } catch (error) {

        return res.status(500).json({
            error: true,
            message: "Gagal mengambil data ArcGIS",
            detail: error.message
        });

    }
}
