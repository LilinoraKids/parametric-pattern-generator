const DraftingEngine = {
    calculatePattern(m, E) {
        // Vertical Depths
        const dNape = 2.0;
        const dBustBase = m.B <= 40.0 ? (0.5 * m.BW + 0.375) : (0.5 * m.BW + 0.625);
        const deltaYScye = E > 1.25 ? 0.5 * (E - 1.25) : 0;
        const dBustAdj = dNape + dBustBase + deltaYScye;
        const dWaist = dNape + m.BW;
        const dHip = dWaist + m.WH;

        // Proportional Dimensions
        const BNW = ((m.B / 8.0) + 1.25) / 2.0;
        const FNW = BNW - 0.25;
        const FND = BNW + 0.5;

        // --- BACK BODICE (Origin X: 3.0) ---
        const backOriginX = 3.0;
        const backCenterLine = backOriginX;
        const backNeckPt = { x: backCenterLine + BNW, y: dNape - 0.75 };
        const backShoulderPt = { x: backNeckPt.x + m.S, y: dNape + 0.875 };
        const backAcrossPt = { x: backCenterLine + (0.5 * m.BWidth), y: dNape + (dBustBase * 0.5) };
        const backBustPt = { x: backCenterLine + (0.25 * m.B) + (0.25 * E), y: dBustAdj };
        const backWaistPt = { x: backCenterLine + (0.25 * m.W) + (0.25 * E) + 1.0, y: dWaist };
        const backHipPt = { x: backCenterLine + (0.25 * m.H) + (0.25 * E), y: dHip };

        // Back Dart Setup
        const backDartX = backCenterLine + (BNW * 1.1);

        // --- FRONT BODICE (Origin X: 22.0) ---
        const frontOriginX = 22.0;
        const frontCenterLine = frontOriginX + (0.25 * m.B) + (0.25 * E);
        
        // Front Apex & Neck
        const apexX = frontCenterLine - (0.25 * m.CWidth);
        const apexY = dBustAdj + 1.5;
        const sewingApexY = apexY + 0.8;

        const frontNeckPt = { x: frontCenterLine - FNW, y: dNape };
        const frontShoulderPt = { x: frontNeckPt.x - m.S, y: dNape + 1.25 };
        const frontAcrossPt = { x: frontCenterLine - (0.5 * m.CWidth), y: dNape + (dBustBase * 0.5) };
        const frontBustPt = { x: frontOriginX, y: dBustAdj };
        const frontWaistPt = { x: frontOriginX + 0.75, y: dWaist };
        const frontHipPt = { x: frontOriginX, y: dHip };

        return {
            depths: { dNape, dBustAdj, dWaist, dHip },
            back: {
                centerLine: backCenterLine,
                napePt: { x: backCenterLine, y: dNape },
                neckPt: backNeckPt,
                shoulderPt: backShoulderPt,
                acrossPt: backAcrossPt,
                bustPt: backBustPt,
                waistPt: backWaistPt,
                hipPt: backHipPt,
                dart: { x: backDartX, topY: dBustAdj + 0.5, bottomY: dWaist + 4.0, width: 1.0 }
            },
            front: {
                centerLine: frontCenterLine,
                neckTopPt: { x: frontCenterLine, y: dNape },
                neckLowPt: { x: frontCenterLine, y: dNape + FND },
                neckPt: frontNeckPt,
                shoulderPt: frontShoulderPt,
                acrossPt: frontAcrossPt,
                bustPt: frontBustPt,
                waistPt: frontWaistPt,
                hipPt: frontHipPt,
                apex: { x: apexX, y: apexY },
                sewingApex: { x: apexX, y: sewingApexY }
            }
        };
    }
};
