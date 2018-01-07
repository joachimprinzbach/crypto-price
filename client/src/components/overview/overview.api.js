const assets = [
    {
        "sign": "TRX",
        "amount": 100
    },
    {
        "sign": "XLM",
        "amount": 200
    },

];

export default {
    fetchOverview(cb) {
        setTimeout(() => cb(assets), 100)
    }
}