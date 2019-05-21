export class Argentina {

    getBsAs1 = new Provincia('BUENOS AIRES #1', '708233', { lat: -34.6131516, lng: -58.3772316 });
    getBsAs2 = new Provincia('BUENOS AIRES #2', '635570497412661753', { lat: -34.603683, lng: -58.381557 });
    getBsAs3 = new Provincia('BUENOS AIRES #3', '635570497412661754', { lat: -34.603683, lng: -58.381557 });
    getBsAs4 = new Provincia('BUENOS AIRES #4', '635570497412661755', { lat: -34.603683, lng: -58.381557 });

    getCatamarca = new Provincia('CATAMARCA', '635570497412661756', { lat: -28.471588, lng: -65.787720 });
    getChaco = new Provincia('CHACO', '635570497412661757', { lat: -22.8666700, lng: -62.9333300 });
    getChubut = new Provincia('CHUBUT', '635570497412661758', { lat: -44.001659, lng: -67.884041 });
    getCABA = new Provincia('CABA', '635570497412661759', { lat: -34.603683, lng: -58.381557 });
    getCordoba = new Provincia('CORDOBA', '635570497412661760', { lat: -27.367940, lng: -55.893720 });
    getCorrientes = new Provincia('CORRIENTES', '635570497412661761', { lat: -27.501921, lng: -58.812889 });
    getEducar = new Provincia('EDUCAR_20', '689613692941107203', { lat: -34.603683, lng: -58.381557 });
    getEntreRios = new Provincia('ENTRE RIOS', '635570497412661762', { lat: -30.1146, lng: -68.6919 });
    getFomosa = new Provincia('FORMOSA', '635570497412661763', { lat: -26.1775300, lng: -58.1781400 });
    getJujuy = new Provincia('JUJUY', '635570497412661764', { lat: -24.180380, lng: -65.308820 });
    getLaPampa = new Provincia('LA PAMPA', '635570497412661765', { lat: -36.626270, lng: -64.291310 });
    getLaRioja = new Provincia('LA RIOJA', '635570497412661766', { lat: -29.4110500, lng: -66.8506700 });
    getMendoza = new Provincia('MENDOZA', '635570497412661767', { lat: -32.889458, lng: -68.845840 });
    getMisiones = new Provincia('MISIONES', '635570497412661768', { lat: -27.366310, lng: -55.895650 });
    getNeuquen = new Provincia('NEUQUEN', '635570497412661769', { lat: -38.599361, lng: -69.980080 });
    getRioNegro = new Provincia('RIO NEGRO', '635570497412661770', { lat: -26.105690, lng: -49.801190 });
    getSalta = new Provincia('SALTA', '635570497412661771', { lat: -24.782127, lng: -65.423195 });
    getSanJuan = new Provincia('SAN JUAN', '635570497412661772', { lat: -31.5375000, lng: -68.5363900 });
    getSanLuis = new Provincia('SAN LUIS', '635570497412661773', { lat: -33.2950100, lng: -66.3356300 });
    getSantaFe = new Provincia('SANTA FE', '635570497412661775', { lat: -23.4833300, lng: -63.4333300 });
    getSantiago = new Provincia('SGO. DEL ESTERO', '635570497412661776', { lat: -27.786970, lng: -64.262110 });
    getSantaCruz = new Provincia('SANTA CRUZ', '635570497412661774', { lat: -51.6333, lng: -69.2167 });
    getTierraDelFuego = new Provincia('TIERRA DEL FUEGO', '635570497412661777', { lat: -54.805401, lng: -68.324203 });
    getTucuman = new Provincia('TUCUMAN', '635570497412661778', { lat: -26.822113, lng: -65.219292 });

    getProvShow = new Provincia('BUENOS AIRES #1', '708233', { lat: -34.6131516, lng: -58.3772316 });

    getProvincias = [
        this.getBsAs1,
        this.getBsAs2,
        this.getBsAs3,
        this.getBsAs4,
        this.getCatamarca,
        this.getChaco,
        this.getChubut,
        this.getCABA,
        this.getCordoba,
        this.getCorrientes,
        this.getEducar,
        this.getEntreRios,
        this.getFomosa,
        this.getJujuy,
        this.getLaPampa,
        this.getLaRioja,
        this.getMendoza,
        this.getMisiones,
        this.getNeuquen,
        this.getRioNegro,
        this.getSalta,
        this.getSanJuan,
        this.getSanLuis,
        this.getSantaFe,
        this.getSantiago,
        this.getSantaCruz,
        this.getTierraDelFuego,
        this.getTucuman
    ];
}

export class DeviceStatus {
    lanIp: string;
    mac: string;
    name: string;
    networkId: string;
    publicIp: string;
    serial: string;
    status: string;
}

export class InfoPredio {
    id: string;
    organizationId: string;
    name: string;
    timeZone: string;
    tags: string;
    type: string;
    configTemplateId: string;
    disableMyMerakiCom: boolean;
    disableRemoteStatusPage: boolean;
}

export class Provincia {
    name: string;
    organizationId: string;
    getCoordenadas: any;
    getTotalDevices: DeviceStatus[] = [];
    listOnline: DeviceStatus[] = [];
    listOffline: DeviceStatus[] = [];
    listOnlineQ2TN: DeviceStatus[] = [];
    listOnlineQ2PN: DeviceStatus[] = [];
    listOfflineQ2TN: DeviceStatus[] = [];
    listOfflineQ2PN: DeviceStatus[] = [];

    statesListOnlineQ2TN: InfoPredio[] = [];
    statesListOnlineQ2PN: InfoPredio[] = [];
    statesListOfflineQ2TN: InfoPredio[] = [];
    statesListOfflineQ2PN: InfoPredio[] = [];

    constructor(name: string, orgId: string, coodenada: any) {
        this.name = name;
        this.organizationId = orgId;
        this.getCoordenadas = coodenada;
    }
}

