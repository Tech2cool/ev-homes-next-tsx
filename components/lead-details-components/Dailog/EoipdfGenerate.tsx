"use client";
import React, {useState, useEffect } from "react";
import { jsPDF } from "jspdf";

interface GeneratePdfProps {
  openclick: React.Dispatch<React.SetStateAction<boolean>>;
  formData: {
    floor: string;
    unit: string;
    sqmtrs: string;
    amount: string;
    secondAmount: string;
    paymentDate: string;
    TransactionNo: string
  };
}

const GeneratePdf: React.FC<GeneratePdfProps> = ({ openclick, formData }) => {
  function numberToWords(num: number): string {
    if (isNaN(num)) return "";
    const a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const inWords = (n: number): string => {
      if (n < 20) return a[n];
      if (n < 100)
        return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
      if (n < 1000)
        return (
          a[Math.floor(n / 100)] +
          " Hundred" +
          (n % 100 ? " and " + inWords(n % 100) : "")
        );
      if (n < 100000)
        return (
          inWords(Math.floor(n / 1000)) +
          " Thousand" +
          (n % 1000 ? " " + inWords(n % 1000) : "")
        );
      if (n < 10000000)
        return (
          inWords(Math.floor(n / 100000)) +
          " Lakh" +
          (n % 100000 ? " " + inWords(n % 100000) : "")
        );
      return (
        inWords(Math.floor(n / 10000000)) +
        " Crore" +
        (n % 10000000 ? " " + inWords(n % 10000000) : "")
      );
    };
    return inWords(num);
  }

  useEffect(() => {
    if (!formData) return;
    const paymentType = localStorage.getItem("pdfType") || "Not Full Paid";
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const leftMargin = 80;
    const rightMargin = 80;
    const contentWidth = pageWidth - leftMargin - rightMargin;
    let y = 80;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const mrText = "Mr. _______________________________";
    const mrTextWidth = doc.getTextWidth(mrText);
    const mrX = (pageWidth - mrTextWidth) / 2;
    doc.text(mrText, mrX, y);

    const dateText = `Date:${formData.paymentDate}`;
    const dateTextWidth = doc.getTextWidth(dateText);
    const dateX = pageWidth - dateTextWidth - rightMargin;
    y += 25;
    doc.text(dateText, dateX, y);

    y += 40;
    const address = [
      "Shri E.V. Thomas",
      "Proprietor",
      "M/s. E.V. Homes",
      "212, A-Wing, Vardhman Chambers",
      "Plot No.84, Sector 17, Vashi, Navi Mumbai 400 703",
    ];
    address.forEach((line) => {
      doc.text(line, leftMargin, y);
      y += 14;
    });

    y += 10;
    const subjectLeftMargin = leftMargin + 40;
    const subjectStart = "Sub:";
    const subjectText =
      "Expression of interest in the proposed Project of E.V. Homes Constructions Private Limited (“Company”) on Plot No. 11 admeasuring 11,164.52 Sq. Meters and thereabouts situated at Sector - 9, Vashi, Navi Mumbai (“Plot”) by CIDCO Limited.";
    const subWidth = doc.getTextWidth(subjectStart + " ");
    const subjectMaxWidth = contentWidth - 50;
    const subjectLines = doc.splitTextToSize(
      subjectText,
      subjectMaxWidth - subWidth
    );

    doc.setFont("helvetica", "bold");
    doc.text(subjectStart, subjectLeftMargin, y);
    doc.setFont("helvetica", "normal");
    doc.text(subjectLines, subjectLeftMargin + subWidth, y, {
      maxWidth: subjectMaxWidth - subWidth,
      align: "justify",
    });

    y += subjectLines.length * 15 + 10;
    const paraMaxWidth = contentWidth;

    const paras = [
      {
        num: "1.",
        text: "It has come to our knowledge that E.V. Homes Constructions Private Limited has been assigned the development rights of Plot No. 11 admeasuring 11,164.52 Sq. Meters and thereabouts situated at Sector - 9, Vashi, Navi Mumbai by CIDCO Limited.",
      },
      {
        num: "2.",
        text: "It is further come to our knowledge that the said Company intend to construct a “Residential cum Commercial Project” named “Capitol 9” on the said Plot consisting of residential and commercial buildings (“Project”).",
      },
      {
        num: "3.",
        text: `We are aware that you require financial assistance for the development of the said Project. Accordingly, we are hereby offering you an amount of Rs. ${formData.amount}(“Amount”) upon the following terms and conditions:`,
      },
    ];

    paras.forEach((p) => {
      const numWidth = doc.getTextWidth(p.num + " ");
      const lines = doc.splitTextToSize(p.text, paraMaxWidth - numWidth);
      doc.setFont("helvetica", "bold");
      doc.text(p.num, leftMargin, y);
      doc.setFont("helvetica", "normal");
      doc.text(lines, leftMargin + numWidth, y, {
        maxWidth: paraMaxWidth - numWidth,
        align: "justify",
      });
      y += lines.length * 15 + 10;
      if (p.num === "3.") {
        const subPoints = [
          {
            label: "a.",
            text: paymentType == "Full Paid" ? "The financial assistance has already been paid on ______________________________ . The said financial assistance shall carry a rate of interest @12% per annum subject to the terms and conditions as mentioned in this Letter." :
              "The financial assistance will be paid on or before ______________________________. The said financial assistance shall carry a rate of interest @12% per annum subject to the terms and conditions as mentioned in this Letter.",
          },
          {
            label: "b.",
            text: `We may at our sole option acquire a Commercial Unit No.${formData.unit}, admeasuring ${formData.sqmtrs} sq. mtrs. Carpet area, on ${formData.floor} floor of Commercial building in the said Project (“Unit”) to be constructed on the said Plot. The Basic price of the said Unit (excluding below mentioned additional charges) is determined at Rs.${formData.secondAmount} (Rupees ${numberToWords(Number(formData.secondAmount))} only ).`,
          },
        ];
        const subIndent = leftMargin + numWidth;
        const subMaxWidth = paraMaxWidth - numWidth;
        subPoints.forEach((sp) => {
          const labelWidth = doc.getTextWidth(sp.label + " ");
          const linesSub = doc.splitTextToSize(sp.text, subMaxWidth - labelWidth);
          doc.setFont("helvetica", "bold");
          doc.text(sp.label, subIndent, y);
          doc.setFont("helvetica", "normal");
          doc.text(linesSub, subIndent + labelWidth, y, {
            maxWidth: subMaxWidth - labelWidth,
            align: "justify",
          });
          y += linesSub.length * 15 + 15;
        });
      }
    });

    doc.addPage();
    y = 80;
    const mrText2 = "Mr. _______________________________";
    const mrTextWidth2 = doc.getTextWidth(mrText2);
    const mrX2 = (pageWidth - mrTextWidth2) / 2;
    doc.text(mrText2, mrX2, y);

    y += 40;
    const subIndent = leftMargin + 25;
    const subMaxWidth = contentWidth - 25;

    const subPointsPage2 = [
      {
        label: "c.",
        text: "We may convert the said financial assistance into consideration for the said Unit within 30 (thirty) days of receipt of commencement certificate for the said building in which the said Unit is located. The said intimation shall be sent by us in writing within the scheduled period.",
      },
      {
        label: "d.",
        text: "We undertake to pay the stamp duty and execute a formal Agreement for Sale of the said Unit immediately upon intimating our decision to acquire the said Unit. It is understood that we shall have the first right of selection of the said Unit upon sanction of plan.",
      },
      {
        label: "e.",
        text: "We understand that through this expression of interest, we are not getting any right, title, interest in the proposed Unit. This expression of interest merely entitles us to acquire a Unit of our choice at the rate mentioned herein within prescribed time period.",
      },
      {
        label: "f.",
        text: "We undertake not to sell, transfer, assign or mortgage our rights through this expression of interest at any time without obtaining prior written permission of the said Company.",
      },
      {
        label: "g.",
        text: "We further undertake to pay the following charges to the said Company at the time of formal documentation:",
      },
    ];

    subPointsPage2.forEach((sp) => {
      const labelWidth = doc.getTextWidth(sp.label + " ");
      const linesSub = doc.splitTextToSize(sp.text, subMaxWidth - labelWidth);
      doc.setFont("helvetica", "bold");
      doc.text(sp.label, subIndent, y);
      doc.setFont("helvetica", "normal");
      doc.text(linesSub, subIndent + labelWidth, y, {
        maxWidth: subMaxWidth - labelWidth,
        align: "justify",
      });
      y += linesSub.length * 15 + 15;
    });

    const tableTop = y + 0;
    const tableWidth = contentWidth * 0.8;
    const col1Width = 80;
    const col2Width = tableWidth - col1Width;
    const col1X = (pageWidth - tableWidth) / 2;
    const col2X = col1X + col1Width;
    const rowHeight = 25;
    const tableData = [
      ["Sr. No.", "Nature of charges"],
      ["(i)", "GST as per applicable law"],
      ["(ii)", "Development charges"],
      ["(iii)", "Society formation charges & Sinking Fund"],
      ["(iv)", "Legal charges"],
      ["(v)", "Stamp duty"],
      ["(vi)", "Registration charges"],
      ["(vii)", "Parking charges"],
      [
        "(viii)",
        "Any other statutory charges payable by the Developer to the statutory authorities on behalf of unit holders.",
      ],
    ];
    let currentY = tableTop;
    doc.setFont("helvetica", "bold");
    doc.rect(col1X, currentY, tableWidth, rowHeight);
    doc.line(col2X, currentY, col2X, currentY + rowHeight);
    doc.text("Sr. No.", col1X + 8, currentY + 16);
    doc.text("Nature of charges", col2X + 8, currentY + 16);
    currentY += rowHeight;
    doc.setFont("helvetica", "normal");
    for (let i = 1; i < tableData.length; i++) {
      const [sr, text] = tableData[i];
      const textLines = doc.splitTextToSize(text, col2Width - 15);
      const cellHeight = Math.max(rowHeight, textLines.length * 14 + 10);
      doc.rect(col1X, currentY, tableWidth, cellHeight);
      doc.line(col2X, currentY, col2X, currentY + cellHeight);
      doc.text(sr, col1X + 10, currentY + 17);
      doc.text(textLines, col2X + 10, currentY + 17, {
        maxWidth: col2Width - 15,
        align: "left",
      });
      currentY += cellHeight;
    }

    y = currentY + 25;
    const labelH = "h.";
    const textH =
      "This financial assistance shall be provided in the name of M/s. EV Homes. The said financial assistance shall be treated as “unsecured loan” in the books of accounts of M/s. EV Homes till the date of receipt of intimation from us. On receipt of intimation, the said financial assistance shall be refunded and shall be paid by us as consideration for purchase of said Unit in the name of EV Homes Constructions Pvt. Ltd.";
    const labelWidthH = doc.getTextWidth(labelH + " ");
    const linesH = doc.splitTextToSize(textH, subMaxWidth - labelWidthH);
    doc.setFont("helvetica", "bold");
    doc.text(labelH, subIndent, y);
    doc.setFont("helvetica", "normal");
    doc.text(linesH, subIndent + labelWidthH, y, {
      maxWidth: subMaxWidth - labelWidthH,
      align: "justify",
    });

    doc.addPage();
    y = 80;
    const mrText3 = "Mr. _______________________________";
    const mrTextWidth3 = doc.getTextWidth(mrText3);
    const mrX3 = (pageWidth - mrTextWidth3) / 2;
    doc.text(mrText3, mrX3, y);

    y += 40;
    const subPointsPage3 = [
      {
        label: "i.",
        text: "We undertake not to claim any interest on the amount advanced till the date of intimation by us. No enforceable debt for interest arises against the said Company or M/s. EV Homes. If we decide to redeem the amount advanced then such amount shall be refunded along with interest calculated at the rate of 12% per annum from the date the amount was advanced by us till the date of actual payment by M/s. EV Homes.",
      },
      {
        label: "j.",
        text: "If we decide to seek the amount invested along with interest accrued thereon, M/s. EV Homes shall repay the said Amount by the maturity date. If M/s. EV Homes defaults in repaying the said amount by the maturity date, then M/s. EV Homes shall pay penal interest @ 1% per month or part thereof till the date of repayment.",
      },
      {
        label: "k.",
        text: "We understand that no interest will be accrued on the said financial assistance if we intimate in writing for acquiring the said Unit and only the principal amount will be adjusted against the sale consideration of said Unit.",
      },
    ];
    subPointsPage3.forEach((sp) => {
      const labelWidth = doc.getTextWidth(sp.label + " ");
      const lines = doc.splitTextToSize(sp.text, subMaxWidth - labelWidth);
      doc.setFont("helvetica", "bold");
      doc.text(sp.label, subIndent, y);
      doc.setFont("helvetica", "normal");
      doc.text(lines, subIndent + labelWidth, y, {
        maxWidth: subMaxWidth - labelWidth,
        align: "justify",
      });
      y += lines.length * 15 + 15;
    });
    y += 20;
    const point4 = {
      num: "4.",
      text:
        `The aforesaid Amount of Rs. ${formData.secondAmount} (Rupees ${numberToWords(Number(formData.secondAmount))} only) is being paid to you with an Initial token Amount of Rs. _______________________(Rupees________________) vide IMPS Transaction Number ${formData.TransactionNo} dated __________________________ drawn on IndusInd Bank.`,
    };
    const numWidth4 = doc.getTextWidth(point4.num + " ");
    const lines4 = doc.splitTextToSize(point4.text, contentWidth - numWidth4);
    doc.setFont("helvetica", "bold");
    doc.text(point4.num, leftMargin, y);
    doc.setFont("helvetica", "normal");
    doc.text(lines4, leftMargin + numWidth4, y, {
      maxWidth: contentWidth - numWidth4,
      align: "justify",
    });
    y += lines4.length * 15 + 15;
    y += 25;
    doc.setFont("helvetica", "normal");
    const closingLines = [
      "Thanking you,",
      "Yours faithfully,",
      "(____________________)",
    ];
    closingLines.forEach((line) => {
      doc.text(line, leftMargin, y);
      y += 18;
    });
    y += 30;
    const rightX = pageWidth - rightMargin - 100;
    doc.setFont("helvetica", "bold");
    doc.text("I Accept", rightX, y);
    y += 18;
    doc.text("For M/s. E.V. Homes", rightX, y);
    y += 18;
    doc.setFont("helvetica", "normal");
    doc.text("(_________________)", rightX, y);
    y += 16;
    const proprietorIndent = rightX + 60;
    doc.text("Proprietor", proprietorIndent, y);
    window.open(doc.output("bloburl"), "_blank");
  }, [formData]);

  return null;
};

export default GeneratePdf;
