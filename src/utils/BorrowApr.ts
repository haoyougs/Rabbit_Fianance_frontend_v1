export const borrowAprCommon = (BorrowedValue: any, DepositValue: any) => {
    const u = parseFloat(BorrowedValue) / DepositValue;
    let m = 0;
    let b = 0;
    if (0 < u && u <= 0.8) {
        m = 0.125;
        b = 0;
    }
    if (0.8 < u && u <= 0.9) {
        m = 0;
        b = 0.1;
    }
    if (0.9 < u && u <= 1) {
        m = 5;
        b = -4.4;
    }
    const Borrow_Apr = (m * u + b);
    return Borrow_Apr;
}