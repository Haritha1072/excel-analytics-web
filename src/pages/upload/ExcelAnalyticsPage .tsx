import ExcelChartViewer from "./components/ExcelChartViewer";
import ExcelUploadForm from "./components/ExcelUploadForm";

export default function ExcelAnalyticsPage() {
  return (
    <div className="p-4 flex flex-col gap-3">
      <ExcelUploadForm />
      <ExcelChartViewer />
    </div>
  );
}
