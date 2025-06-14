import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useUploadedFiles } from "@/hooks/useUploadedFiles";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ExcelChartViewer: React.FC = () => {
  const { uploadedFiles } = useUploadedFiles();
  const [headers, setHeaders] = useState<string[]>([]);
  const [labelKey, setLabelKey] = useState<string>("");
  const [valueKeys, setValueKeys] = useState<string[]>([]);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    if (uploadedFiles?.length) {
      const file = uploadedFiles[uploadedFiles.length - 1];
      extractHeadersFromExcel(file);
    }
  }, [uploadedFiles]);

  const extractHeadersFromExcel = async (file: any) => {
    try {
      const buffer = Uint8Array.from(file.data.data);
      const workbook = XLSX.read(buffer, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      if (rows.length > 0) {
        setHeaders(rows[0] as string[]);
        toast.success("Headers loaded.");
      }
    } catch (error) {
      toast.error("Failed to load headers.");
      console.error("Header extraction error:", error);
    }
  };

  const extractDataFromExcel = async (
    file: any,
    labelKey: string,
    valueKeys: string[]
  ) => {
    const buffer = Uint8Array.from(file.data.data);
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet); // [{}, {}, ...]
    console.log("JSON Data", jsonData);

    const labels = jsonData.map((row: any) => row[labelKey]);
    console.log("Labels", labels);
    console.log("Value Keys", valueKeys);

    const datasets = valueKeys.map((key, index) => ({
      label: key,
      data: jsonData.map((row: any) => row[key]),
      backgroundColor: getColor(index),
    }));

    return { labels, datasets };
  };

  const getColor = (index: number) => {
    const colors = [
      "rgba(75, 192, 192, 0.6)",
      "rgba(153, 102, 255, 0.6)",
      "rgba(255, 159, 64, 0.6)",
      "rgba(255, 99, 132, 0.6)",
      "rgba(54, 162, 235, 0.6)",
    ];
    return colors[index % colors.length];
  };

  const loadChartFromExcel = async () => {
    if (!uploadedFiles || uploadedFiles.length === 0) {
      toast.error("Please upload a file first.");
      return;
    }
    if (!labelKey || valueKeys.length === 0) {
      toast.error("Please select label and value keys.");
      return;
    }

    try {
      const file = uploadedFiles[uploadedFiles.length - 1];
      const { labels, datasets } = await extractDataFromExcel(
        file,
        labelKey,
        valueKeys
      );
      setChartData({ labels, datasets });
      toast.success("Chart loaded successfully!");
    } catch (error) {
      console.error("Error loading chart data:", error);
      toast.error("Failed to load chart data.");
    }
  };

  return (
    <div className="space-y-4">
      {headers.length > 0 && (
        <div className="flex flex-col gap-4">
          {/* Label Key Select */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Select Label (X-axis)</label>
            <Select onValueChange={(val) => setLabelKey(val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select label key" />
              </SelectTrigger>
              <SelectContent>
                {headers.map((header) => (
                  <SelectItem key={header} value={header}>
                    {header}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Value Key Select (single select) */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Select Value (Y-axis)</label>
            <Select onValueChange={(val) => setValueKeys([val])}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select value key" />
              </SelectTrigger>
              <SelectContent>
                {headers.map((header) => (
                  <SelectItem key={header} value={header}>
                    {header}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <Button onClick={loadChartFromExcel}>View Chart</Button>

      <div className="mt-6">{chartData && <Bar data={chartData} />}</div>
    </div>
  );
};

export default ExcelChartViewer;
