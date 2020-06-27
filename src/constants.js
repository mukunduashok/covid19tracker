class ApiConstants {
    constructor() {
        this.STATE_CODE_MAP = {};
        this.API_URLS = {
            COVID_19_STATE_WISE_DATA: "https://api.covid19india.org/data.json",
            COVID_19_DISTRICT_WISE_DATA: "https://api.covid19india.org/state_district_wise.json",
            COVID_19_STATE_WISE_DAILY_CHANGES: "https://api.covid19india.org/v3/timeseries.json",
            COVID_19_STATE_WISE_TESTING_DATA: "https://api.covid19india.org/state_test_data.json",
            COVID_19_DISTRICT_WISE_DAILY_CHANGES: "https://api.covid19india.org/districts_daily.json",
            COVID_19_DISTRICT_LEVEL_ZONES: "https://api.covid19india.org/zones.json",
        };
        this.CODE_STATE_MAP = {
            an: "Andaman and Nicobar Islands",
            ap: "Andhra Pradesh",
            ar: "Arunachal Pradesh",
            as: "Assam",
            br: "Bihar",
            ch: "Chandigarh",
            ct: "Chhattisgarh",
            dd: "Daman and Diu",
            dl: "Delhi",
            dn: "Dadra and Nagar Haveli",
            ga: "Goa",
            gj: "Gujarat",
            hp: "Himachal Pradesh",
            hr: "Haryana",
            jh: "Jharkhand",
            jk: "Jammu and Kashmir",
            ka: "Karnataka",
            kl: "Kerala",
            la: "Ladakh",
            ld: "Lakshadweep",
            mh: "Maharashtra",
            ml: "Meghalaya",
            mn: "Manipur",
            mp: "Madhya Pradesh",
            mz: "Mizoram",
            nl: "Nagaland",
            or: "Odisha",
            pb: "Punjab",
            py: "Puducherry",
            rj: "Rajasthan",
            sk: "Sikkim",
            tg: "Telangana",
            tn: "Tamil Nadu",
            tr: "Tripura",
            tt: "Total",
            un: "Unassigned",
            up: "Uttar Pradesh",
            ut: "Uttarakhand",
            wb: "West Bengal",
        };
        Object.keys(this.CODE_STATE_MAP).forEach((k) => this.STATE_CODE_MAP[this.CODE_STATE_MAP[k]] = k);
    }
}

export default ApiConstants;