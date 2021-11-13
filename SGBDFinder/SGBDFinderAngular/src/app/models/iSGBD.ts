
export interface iSGBD{
    _objectID: number;
    nome: string;
    descricao: string;
    caminho_logo: string;
    link: string;
    seguranca: number;
    consistencia_integridade: number;
    disponibilidade: number;
    facilidade_uso: number;
    interoperabilidade: number;
    desempenho_escalabilidade: number;
}

export interface iCaracteristicas{
    seguranca: number;
    consistencia_integridade: number;
    disponibilidade: number;
    facilidade_uso: number;
    interoperabilidade: number;
    desempenho_escalabilidade: number;
}
