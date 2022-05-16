export const getApy = (Farm_Apr: any, Trading_Free: any, RABBIT_Rewards: any, Borrow_Apr: any, Leverage: any) => {
    const APR = (Farm_Apr * Leverage) + (Trading_Free * Leverage) + RABBIT_Rewards * Leverage - Borrow_Apr * (Leverage - 1);
    const day = 1 + (APR / 365);
    const APY = Math.pow(day, 365) - 1;
    return APY;
}