export const borrowAprCommon = (BorrowedValue: any, DepositValue: any) => {
    const u = parseFloat(BorrowedValue) / DepositValue;
    let m = 0;
    let b = 0;
    if (0 < u && u <= 0.75) {
        m = 0.267;
        b = 0;
    }
    if (0.75 < u && u <= 0.9) {
        m = 0;
        b = 0.2;
    }
    if (0.9 < u && u <= 1) {
        m = 13;
        b = -11.5;
    }
    const Borrow_Apr = (m * u + b);
    return Borrow_Apr;
}