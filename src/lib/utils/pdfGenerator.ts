import jsPDF from 'jspdf';

export interface ItineraryData {
  packageName: string;
  duration: {
    days: number;
    nights: number;
  };
  startCity: string;
  destinationCity: string[];
  itinerary: Array<{
    dayNo: number;
    title: string;
    subtitle: string;
    description: string;
    stay: boolean;
    mealsIncluded: string[];
    transport: {
      type: string;
      details: string;
    };
    placesToVisit: string[];
    activities: Array<{
      type: string;
      title: string;
      description: string;
      duration: string;
    }>;
    notes?: string;
  }>;
}

export const generateItineraryPDF = (data: ItineraryData, fileName: string = 'itinerary.pdf') => {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    // Helper function to check if we need a new page
    const checkNewPage = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
        return true;
      }
      return false;
    };

    // Helper function to add text with word wrap
    const addText = (text: string, fontSize: number, style: 'normal' | 'bold' = 'normal', color: [number, number, number] = [0, 0, 0]) => {
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', style);
      pdf.setTextColor(...color);
      const lines = pdf.splitTextToSize(text, contentWidth);

      for (const line of lines) {
        checkNewPage(fontSize * 0.5);
        pdf.text(line, margin, yPosition);
        yPosition += fontSize * 0.5;
      }
    };

    // Header
    pdf.setFillColor(39, 137, 255);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text(data.packageName, margin, 20);

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${data.duration.days} Days / ${data.duration.nights} Nights`, margin, 30);

    yPosition = 50;

    // Package Info
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(11);
    pdf.text(`Starting City: ${data.startCity}`, margin, yPosition);
    yPosition += 6;
    pdf.text(`Destinations: ${data.destinationCity.join(', ')}`, margin, yPosition);
    yPosition += 10;

    // Draw line
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Itinerary Days
    data.itinerary.forEach((day, index) => {
      checkNewPage(30);

      // Day Header
      pdf.setFillColor(241, 247, 255);
      pdf.rect(margin, yPosition - 5, contentWidth, 12, 'F');

      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(39, 137, 255);
      pdf.text(`Day ${day.dayNo}: ${day.title}`, margin + 3, yPosition + 3);
      yPosition += 15;

      // Subtitle
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      const subtitleLines = pdf.splitTextToSize(day.subtitle, contentWidth);
      subtitleLines.forEach((line: string) => {
        checkNewPage(5);
        pdf.text(line, margin, yPosition);
        yPosition += 5;
      });
      yPosition += 2;

      // Description
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      const descLines = pdf.splitTextToSize(day.description, contentWidth);
      descLines.forEach((line: string) => {
        checkNewPage(5);
        pdf.text(line, margin, yPosition);
        yPosition += 5;
      });
      yPosition += 3;

      // Transport
      if (day.transport?.type) {
        checkNewPage(8);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`TRANSPORT:`, margin, yPosition);
        yPosition += 5;
        pdf.setFont('helvetica', 'normal');
        pdf.text(`${day.transport.type} - ${day.transport.details}`, margin + 5, yPosition);
        yPosition += 7;
      }

      // Places to Visit
      if (day.placesToVisit?.length > 0) {
        checkNewPage(8);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`PLACES TO VISIT:`, margin, yPosition);
        yPosition += 5;
        pdf.setFont('helvetica', 'normal');
        day.placesToVisit.forEach((place) => {
          checkNewPage(5);
          pdf.text(`• ${place}`, margin + 5, yPosition);
          yPosition += 5;
        });
        yPosition += 2;
      }

      // Activities
      if (day.activities?.length > 0) {
        checkNewPage(8);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`ACTIVITIES:`, margin, yPosition);
        yPosition += 5;
        day.activities.forEach((activity) => {
          checkNewPage(10);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`${activity.title} (${activity.duration})`, margin + 5, yPosition);
          yPosition += 5;
          pdf.setFont('helvetica', 'normal');
          const actLines = pdf.splitTextToSize(activity.description, contentWidth - 10);
          actLines.forEach((line: string) => {
            checkNewPage(4);
            pdf.text(line, margin + 5, yPosition);
            yPosition += 4;
          });
          yPosition += 2;
        });
        yPosition += 2;
      }

      // Meals
      if (day.mealsIncluded?.length > 0) {
        checkNewPage(8);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`MEALS INCLUDED:`, margin, yPosition);
        yPosition += 5;
        pdf.setFont('helvetica', 'normal');
        pdf.text(day.mealsIncluded.join(', '), margin + 5, yPosition);
        yPosition += 7;
      }

      // Stay
      if (day.stay) {
        checkNewPage(8);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`OVERNIGHT STAY`, margin, yPosition);
        yPosition += 7;
      }

      // Notes
      if (day.notes) {
        checkNewPage(8);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`NOTES:`, margin, yPosition);
        yPosition += 5;
        pdf.setFont('helvetica', 'normal');
        const noteLines = pdf.splitTextToSize(day.notes, contentWidth);
        noteLines.forEach((line: string) => {
          checkNewPage(5);
          pdf.text(line, margin + 5, yPosition);
          yPosition += 5;
        });
        yPosition += 2;
      }

      yPosition += 5;
    });

    // Footer on last page
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(
        `Page ${i} of ${totalPages} • Generated on ${new Date().toLocaleDateString()}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }

    // Save the PDF
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const downloadItineraryAsHTML = (data: ItineraryData, fileName: string = 'itinerary.html') => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.packageName} - Itinerary</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      line-height: 1.6;
    }
    .header {
      border-bottom: 3px solid #2789FF;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    h1 {
      color: #2789FF;
      margin: 0 0 10px 0;
    }
    .package-info {
      display: flex;
      gap: 20px;
      margin: 15px 0;
      color: #666;
    }
    .day-card {
      background: #f8f9fa;
      border-left: 4px solid #2789FF;
      padding: 20px;
      margin: 20px 0;
      page-break-inside: avoid;
    }
    .day-header {
      color: #2789FF;
      font-size: 1.3em;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .section {
      margin: 15px 0;
    }
    .section-title {
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
    }
    .activity {
      background: white;
      padding: 10px;
      margin: 10px 0;
      border-radius: 5px;
    }
    ul {
      margin: 5px 0;
      padding-left: 20px;
    }
    @media print {
      body {
        margin: 0;
        padding: 15mm;
      }
      .day-card {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${data.packageName}</h1>
    <div class="package-info">
      <div><strong>Duration:</strong> ${data.duration.days} Days / ${data.duration.nights} Nights</div>
      <div><strong>Starting City:</strong> ${data.startCity}</div>
    </div>
    <div><strong>Destinations:</strong> ${data.destinationCity.join(', ')}</div>
  </div>

  ${data.itinerary.map(day => `
    <div class="day-card">
      <div class="day-header">Day ${day.dayNo}: ${day.title}</div>
      <div class="section">
        <div class="section-title">${day.subtitle}</div>
        <p>${day.description}</p>
      </div>

      ${day.transport.type ? `
        <div class="section">
          <div class="section-title">🚗 Transport:</div>
          <p>${day.transport.type} - ${day.transport.details}</p>
        </div>
      ` : ''}

      ${day.placesToVisit.length > 0 ? `
        <div class="section">
          <div class="section-title">📍 Places to Visit:</div>
          <ul>
            ${day.placesToVisit.map(place => `<li>${place}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${day.activities.length > 0 ? `
        <div class="section">
          <div class="section-title">🎯 Activities:</div>
          ${day.activities.map(activity => `
            <div class="activity">
              <strong>${activity.title}</strong> (${activity.duration})
              <p>${activity.description}</p>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${day.mealsIncluded.length > 0 ? `
        <div class="section">
          <div class="section-title">🍽️ Meals Included:</div>
          <p>${day.mealsIncluded.join(', ')}</p>
        </div>
      ` : ''}

      ${day.stay ? `
        <div class="section">
          <div class="section-title">🏨 Overnight Stay</div>
        </div>
      ` : ''}

      ${day.notes ? `
        <div class="section">
          <div class="section-title">📝 Notes:</div>
          <p>${day.notes}</p>
        </div>
      ` : ''}
    </div>
  `).join('')}

  <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #ddd; text-align: center; color: #999;">
    <p>Generated by Your Travel Company • ${new Date().toLocaleDateString()}</p>
  </div>
</body>
</html>
  `;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
