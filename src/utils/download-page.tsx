/* eslint-disable new-cap */
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Moment from 'moment';

import griipsLogo from '../assets/logo.png';
import protectionLogo from '../assets/protection-mark.png';
import toyotaLogo from '../assets/toyota.png';

const handleDownloadPage = (fileName) => {
  document.getElementById('loading-screen')!.style.visibility = 'visible';
  document.getElementById('loading-screen')!.style.opacity = '1';
  const input = document.getElementById('divIdToPrint');
  const canvas2 = document.createElement('canvas');

  html2canvas(input!).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const img = new Image();
    const pdf = new jsPDF('p', 'in', [8.5, 11]);
    const { pageSize } = pdf.internal;
    const pageWidth = pageSize.width ? pageSize.width :pageSize.getWidth();
    const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
    pdf.setFontSize(7);
    const dateToday = Moment().format(process.env.REACT_APP_DATE_FORMAT);

    img.onload = () => {
      const ctx = canvas2.getContext("2d");
      if (ctx) {
        const w2 = img.width;
        const stdPdfHtinPx = 2400;
        const noOfPages = Math.ceil(img.height / stdPdfHtinPx);
        const stdPdfHtinPxRat = img.height / stdPdfHtinPx;

        const protImgLogo = new Image();
        protImgLogo.src = protectionLogo;
        const griipsImgLogo = new Image();
        griipsImgLogo.src = griipsLogo;
        const toyotaImgLogo = new Image();
        toyotaImgLogo.src = toyotaLogo;

        for (let i = 0; i < noOfPages; i++) {
          const x = (-w2 * i) % (w2);
          const  y = i == 0 ? 0 : -stdPdfHtinPx * i;
          const pageNo = `Page ${i + 1} of ${noOfPages}`;
          canvas2.width = w2;
          canvas2.height = stdPdfHtinPx;

          pdf.addImage(protImgLogo, 'PNG', 0.75, 0.2, 1, 0.30);
          pdf.addImage(toyotaImgLogo, 'PNG', 1.75, 0.2, 1, 0.27);
          ctx.drawImage(img, x, y, w2, stdPdfHtinPx * stdPdfHtinPxRat); // img, x, y, w, h
          pdf.addImage(canvas2.toDataURL('image/png'), 'PNG', 0.75, 0.75, 7, 9.5);
          pdf.addImage(griipsImgLogo, 'PNG', 0.75, pageHeight - 0.55, 0.6, 0.30);
          pdf.text(
            dateToday,
            (pageWidth / 2) - (pdf.getTextWidth(dateToday) / 2),
            pageHeight - 0.30,
            { baseline: 'middle' }
          );
          pdf.text(
            pageNo,
            pageWidth - 0.75 - pdf.getTextWidth(pageNo),
            pageHeight - 0.30,
            { baseline: 'middle' }
          );

          if (i < noOfPages - 1) {
            pdf.addPage();
          }
        }
        pdf.save(fileName);
      }
      document.getElementById('loading-screen')!.style.visibility = 'hidden';
      document.getElementById('loading-screen')!.style.opacity = '0';
    }

    img.onerror = () => {
      document.getElementById('loading-screen')!.style.visibility = 'hidden';
      document.getElementById('loading-screen')!.style.opacity = '0';
    }

    img.src = imgData;
  }).catch(() => {
    document.getElementById('loading-screen')!.style.visibility = 'hidden';
    document.getElementById('loading-screen')!.style.opacity = '0';
  });
};

export default handleDownloadPage;
