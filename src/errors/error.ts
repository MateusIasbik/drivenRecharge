export function conflictError(entity: string) {
    return {
        type: "conflict",
        message: `Há conflito com este ${entity}!`
    }
}

export function invalidError(entity: string) {
    return {
        type: "invalidId",
        message: `${entity} não existe!`
    };
}

export function rentNotFinalizedError() {
    return {
        type: "RentNotFinalized",
        message: "O aluguel ainda não foi finalizado!"
    };
}
