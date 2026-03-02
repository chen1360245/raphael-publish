import React from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface ExportButtonProps {
  previewRef: React.RefObject<HTMLDivElement>
  content: string
}

const ExportButton: React.FC<ExportButtonProps> = ({ previewRef }) => {
  const exportPDF = async () => {
    const previewElement = previewRef.current?.querySelector('.markdown-body') as HTMLElement
    if (!previewElement) {
      alert('预览区域未找到')
      return
    }

    try {
      const canvas = await html2canvas(previewElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const imgWidth = 210 // A4 宽度 mm
      const pageHeight = 297 // A4 高度 mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save('raphael-export.pdf')
    } catch (error) {
      console.error('PDF export error:', error)
      alert('导出 PDF 失败')
    }
  }

  const exportHTML = () => {
    const previewElement = previewRef.current?.querySelector('.markdown-body') as HTMLElement
    if (!previewElement) {
      alert('预览区域未找到')
      return
    }

    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Raphael Export</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.8; padding: 24px; max-width: 800px; margin: 0 auto; }
    h1, h2, h3, h4, h5, h6 { margin-top: 24px; margin-bottom: 16px; font-weight: 600; }
    h1 { font-size: 2em; } h2 { font-size: 1.5em; } h3 { font-size: 1.25em; }
    p { margin-bottom: 16px; }
    a { color: #0066cc; text-decoration: none; }
    code { background: #f8f9fa; padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace; }
    pre { background: #f8f9fa; padding: 16px; border-radius: 6px; overflow-x: auto; }
    blockquote { border-left: 4px solid #007bff; padding-left: 16px; color: #666; margin: 0 0 16px 0; }
    img { max-width: 100%; }
  </style>
</head>
<body>
${previewElement.innerHTML}
</body>
</html>`

    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'raphael-export.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={exportPDF}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        导出 PDF
      </button>
      <button
        type="button"
        onClick={exportHTML}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        导出 HTML
      </button>
    </div>
  )
}

export default ExportButton
