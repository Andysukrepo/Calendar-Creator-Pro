import React from 'react';
import { ExportRange, FileFormat, PageSize } from '../types';

interface ExportPanelProps {
  pageSize: PageSize;
  onPageSizeChange: (s: PageSize) => void;
  customWidth: number;
  customHeight: number;
  onCustomWidthChange: (w: number) => void;
  onCustomHeightChange: (h: number) => void;

  fileFormat: FileFormat;
  onFileFormatChange: (f: FileFormat) => void;
  exportRange: ExportRange;
  onExportRangeChange: (r: ExportRange) => void;

  transparentBg: boolean;
  onTransparentBgChange: (val: boolean) => void;
  includeBleed: boolean;
  onIncludeBleedChange: (val: boolean) => void;

  showHeader: boolean;
  onShowHeaderChange: (val: boolean) => void;
  showMoonLedger: boolean;
  onShowMoonLedgerChange: (val: boolean) => void;

  isPro: boolean;
  exporting: boolean;
  exportStatusText: string;
  onDownload: () => void;
  onOpenPaywall?: () => void;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({
  pageSize,
  onPageSizeChange,
  customWidth,
  customHeight,
  onCustomWidthChange,
  onCustomHeightChange,

  fileFormat,
  onFileFormatChange,
  exportRange,
  onExportRangeChange,

  transparentBg,
  onTransparentBgChange,
  includeBleed,
  onIncludeBleedChange,

  showHeader,
  onShowHeaderChange,
  showMoonLedger,
  onShowMoonLedgerChange,

  isPro,
  exporting,
  exportStatusText,
  onDownload,
  onOpenPaywall
}) => {
  const handleButtonClick = () => {
    if (!isPro) {
      if (onOpenPaywall) onOpenPaywall();
      else onDownload();
    } else {
      onDownload();
    }
  };

  return (
    <section className="panel export-panel">
      <h2>Export calendar</h2>
      <label>
        Page size
        <select
          id="pageSizeSelect"
          value={pageSize}
          onChange={(e) => onPageSizeChange(e.target.value as PageSize)}
        >
          <option value="a4l">A4 landscape</option>
          <option value="a4p">A4 portrait</option>
          <option value="a3p">A3 portrait</option>
          <option value="a3l">A3 landscape</option>
          <option value="a3-full">A3 Full Vertical</option>
          <option value="a3-slim">A3 Slimline</option>
          <option value="usl">US Letter</option>
          <option value="custom">Custom size</option>
        </select>
      </label>

      {pageSize === 'custom' && (
        <div className="two-col" id="customSizeRow">
          <label>
            Width (px)
            <input
              id="customWidthInput"
              type="number"
              value={customWidth}
              onChange={(e) => onCustomWidthChange(parseInt(e.target.value, 10) || 3508)}
            />
          </label>
          <label>
            Height (px)
            <input
              id="customHeightInput"
              type="number"
              value={customHeight}
              onChange={(e) => onCustomHeightChange(parseInt(e.target.value, 10) || 2480)}
            />
          </label>
        </div>
      )}

      <label>
        File format
        <select
          id="fileFormatSelect"
          value={fileFormat}
          onChange={(e) => onFileFormatChange(e.target.value as FileFormat)}
        >
          <option value="png">PNG</option>
          <option value="pdf">PDF</option>
          <option value="svg-simple">SVG (simple)</option>
          <option value="svg-styled">SVG (styled)</option>
        </select>
      </label>

      {fileFormat === 'pdf' && (
        <label id="exportRangeRow">
          Export range
          <select
            id="exportRangeSelect"
            value={exportRange}
            onChange={(e) => onExportRangeChange(e.target.value as ExportRange)}
          >
            <option value="single">Current Month Only</option>
            <option value="full-year">Full Year (12 Months Batch)</option>
          </select>
        </label>
      )}

      <div className="export-toggles-container">
        <div className="toggle-row small">
          <input
            id="showHeaderToggle"
            type="checkbox"
            checked={showHeader}
            onChange={(e) => onShowHeaderChange(e.target.checked)}
          />
          <label htmlFor="showHeaderToggle" style={{ cursor: 'pointer', margin: 0 }}>
            Show calendar header
          </label>
        </div>

        <div className="toggle-row small">
          <input
            id="showMoonLedgerToggle"
            type="checkbox"
            checked={showMoonLedger}
            onChange={(e) => onShowMoonLedgerChange(e.target.checked)}
          />
          <label htmlFor="showMoonLedgerToggle" style={{ cursor: 'pointer', margin: 0 }}>
            Show moon phase ledger
          </label>
        </div>

        <div className="toggle-row small">
          <input
            id="transparentBgToggle"
            type="checkbox"
            checked={transparentBg}
            onChange={(e) => onTransparentBgChange(e.target.checked)}
          />
          <label htmlFor="transparentBgToggle" style={{ cursor: 'pointer', margin: 0 }}>
            Transparent Background
          </label>
        </div>

        <div className="toggle-row small">
          <input
            id="bleedToggle"
            type="checkbox"
            checked={includeBleed}
            onChange={(e) => onIncludeBleedChange(e.target.checked)}
          />
          <label htmlFor="bleedToggle" style={{ cursor: 'pointer', margin: 0 }}>
            Include 3mm bleed
          </label>
        </div>
      </div>

      <div className="export-actions-footer">
        {isPro ? (
          <button
            id="downloadBtn"
            type="button"
            className="tmm-btn tmm-btn-primary full-width"
            disabled={exporting}
            onClick={onDownload}
          >
            {exporting ? exportStatusText || 'Generating...' : 'Download calendar'}
          </button>
        ) : (
          <button
            id="downloadBtn"
            type="button"
            className="tmm-btn tmm-btn-primary full-width"
            onClick={handleButtonClick}
            style={{ background: '#0369a1', borderColor: '#0284c7' }}
          >
            🔓 Unlock PRO to Download
          </button>
        )}

        <p
          id="downloadHint"
          className="hint tiny"
          style={
            isPro
              ? { color: '#16a34a', fontWeight: 600, margin: '6px 0 0' }
              : { margin: '6px 0 0' }
          }
        >
          {isPro ? 'PRO Active. Ready to download.' : 'Downloads locked in DEMO MODE. Click to unlock on Payhip.'}
        </p>
      </div>
    </section>
  );
};
