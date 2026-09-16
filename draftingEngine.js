const DraftingEngine = {
    calculatePattern(m, E) {
        // 1. Vertical Armhole Drop Adjustment
        const deltaYScye = E > 1.25 ? 0.5 * (E - 1.25) : 0;

        // 2. Base Depths
        const dNape = 1.0 + ((m.B - 34.0) / 4.0) * (3.0 / 16.0);
        const dBustBase = m.B <= 40.0 ? (0.5 * m.BW + 0.375) : (0.5 * m.BW + 0.625);
        const dBustAdj = dBustBase + deltaYScye;
        const dWaist = dNape + m.BW;
        const dHip = dWaist + m.WH;

        // 3. Neckline Dimensions
        const BNW = ((m.B / 8.0) + 1.25) / 2.0;
        const FNW = BNW - 0.25;

        // 4. Back Bodice Key Coordinates (Origin X: 50)
        const backOriginX = 50;
        const xArmBack = backOriginX + (0.5 * m.BWidth + 0.25);
        const upBackX = xArmBack + 2.0 + (0.5 * E);
        const hpBackX = backOriginX + (0.25 * m.H + (0.5 * E));

        // 5. Front Bodice Key Coordinates (Origin X: 450)
        const frontOriginX = 450;
        const xDartLine = frontOriginX + (0.25 * m.CWidth);
        const apexX = xDartLine;
        const apexY = dBustAdj + 2.0;
        
        // Front Underarm Point
        const upFrontX = frontOriginX + (0.5 * m.B + (0.5 * E) - (0.5 * m.BWidth + 0.25));
        const hpFrontX = frontOriginX + (0.25 * m.H + (0.5 * E));

        // 6. Retracted Sewing Dart Apex (0.8" Retraction along bisector)
        const retractedApexY = apexY + 0.8;

        return {
            depths: { dNape, dBustAdj, dWaist, dHip },
            neck: { BNW, FNW },
            back: {
                originX: backOriginX,
                xArmBack,
                upX: upBackX,
                upY: dBustAdj,
                hpX: hpBackX,
                shoulderX: backOriginX + BNW,
                shoulderY: dNape - 1.25
            },
            front: {
                originX: frontOriginX,
                apex: { x: apexX, y: apexY },
                sewingApex: { x: retractedApexY, y: retractedApexY },
                upX: upFrontX,
                upY: dBustAdj,
                hpX: hpFrontX,
                shoulderX: frontOriginX + FNW,
                shoulderY: dNape - 1.5
            }
        };
    }
};

