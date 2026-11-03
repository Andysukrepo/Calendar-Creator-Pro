import React from 'react';

export interface WeekendColorControlProps {
  showWeekendBg: boolean;
  onShowWeekendBgChange: (val: boolean) => void;
  saturdayBgColor: string;
  onSaturdayBgColorChange: (color: string) => void;
  sundayBgColor: string;
  onSundayBgColorChange: (color: string) => void;
  linkWeekendColors: boolean;
  onLinkWeekendColorsChange: (val: boolean) => void;
  colorWeekendHeaders: boolean;
  onColorWeekendHeadersChange: (val: boolean) => void;
}

export const PRESET_WEEKEND_COLORS = [
  { name: 'Slate', color: '#f1f5f9' },
  { name: 'Sand', color: '#fef9c3' },
  { name: 'Rose', color: '#ffe4e6' },
  { name: 'Sky', color: '#e0f2fe' },
  { name: 'Sage', color: '#dcfce7' },
  { name: 'Lavender', color: '#f3e8ff' },
  { name: 'Peach', color: '#ffedd5' },
  { name: 'Stone', color: '#f5f5f4' }
];

export const WeekendColorControl: React.FC<WeekendColorControlProps> = ({
  showWeekendBg,
  onShowWeekendBgChange,
  saturdayBgColor,
  onSaturdayBgColorChange,
  sundayBgColor,
  onSundayBgColorChange,
  linkWeekendColors,
  onLinkWeekendColorsChange,
  colorWeekendHeaders,
  onColorWeekendHeadersChange
}) => {
  const handleApplyPreset = (color: string, target: 'both' | 'sat' | 'sun') => {
    if (!showWeekendBg) {
      onShowWeekendBgChange(true);
    }
    if (target === 'both') {
      onSaturdayBgColorChange(color);
      onSundayBgColorChange(color);
    } else if (target === 'sat') {
      onSaturdayBgColorChange(color);
      if (linkWeekendColors) {
        onSundayBgColorChange(color);
      }
    } else {
      onSundayBgColorChange(color);
      if (linkWeekendColors) {
        onSaturdayBgColorChange(color);
      }
    }
  };

  const handleSaturdayChange = (newColor: string) => {
    if (!showWeekendBg) {
      onShowWeekendBgChange(true);
    }
    onSaturdayBgColorChange(newColor);
    if (linkWeekendColors) {
      onSundayBgColorChange(newColor);
    }
  };

  const handleSundayChange = (newColor: string) => {
    if (!showWeekendBg) {
      onShowWeekendBgChange(true);
    }
    onSundayBgColorChange(newColor);
    if (linkWeekendColors) {
      onSaturdayBgColorChange(newColor);
    }
  };

  const handleClear = () => {
    onShowWeekendBgChange(false);
  };

  return (
    <div
      className="weekend-color-panel-section"
      style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
        marginBottom: 10
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8
        }}
      >
        <label
          htmlFor="showWeekendBgToggle"
          style={{
            fontWeight: 700,
            fontSize: 12,
            color: '#1e293b',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
            margin: 0
          }}
        >
          <input
            id="showWeekendBgToggle"
            type="checkbox"
            checked={showWeekendBg}
            onChange={(e) => onShowWeekendBgChange(e.target.checked)}
            style={{ width: 'auto', margin: 0, height: 'auto', cursor: 'pointer' }}
          />
          <span>Colour Saturday &amp; Sunday Columns</span>
        </label>

        {showWeekendBg && (
          <button
            type="button"
            onClick={handleClear}
            className="tmm-btn tmm-btn-ghost"
            style={{
              padding: '2px 8px',
              fontSize: 10.5,
              height: 22,
              lineHeight: 1,
              color: '#64748b'
            }}
            title="Disable column shading"
          >
            Clear
          </button>
        )}
      </div>

      {showWeekendBg && (
        <div style={{ marginTop: 8 }}>
          {/* Link checkbox */}
          <div style={{ marginBottom: 10 }}>
            <label
              htmlFor="linkWeekendColorsToggle"
              style={{
                fontSize: 11.5,
                fontWeight: 500,
                color: '#475569',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer'
              }}
            >
              <input
                id="linkWeekendColorsToggle"
                type="checkbox"
                checked={linkWeekendColors}
                onChange={(e) => {
                  const checked = e.target.checked;
                  onLinkWeekendColorsChange(checked);
                  if (checked) {
                    onSundayBgColorChange(saturdayBgColor);
                  }
                }}
                style={{ width: 'auto', margin: 0, height: 'auto', cursor: 'pointer' }}
              />
              <span>Use same colour for both Saturday &amp; Sunday</span>
            </label>
          </div>

          {/* Color pickers: linked or separated */}
          {linkWeekendColors ? (
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#334155', marginBottom: 4 }}>
                Weekend Columns Colour (Sat &amp; Sun)
              </label>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <div
                  className="color-btn-wrapper tmm-btn"
                  style={{ flex: 1, height: 30, background: '#fff' }}
                >
                  <span
                    className="color-swatch-indicator"
                    style={{ backgroundColor: saturdayBgColor }}
                  />
                  <span>Pick Colour ({saturdayBgColor.toUpperCase()})</span>
                  <input
                    id="weekendColorInputCombined"
                    type="color"
                    value={saturdayBgColor}
                    onChange={(e) => handleSaturdayChange(e.target.value)}
                  />
                </div>
              </div>

              {/* Quick Preset Swatches */}
              <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 10, color: '#64748b', marginRight: 2 }}>Presets:</span>
                {PRESET_WEEKEND_COLORS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => handleApplyPreset(preset.color, 'both')}
                    title={`${preset.name} (${preset.color})`}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      backgroundColor: preset.color,
                      border:
                        saturdayBgColor.toLowerCase() === preset.color.toLowerCase()
                          ? '2px solid #2d3e51'
                          : '1px solid #cbd5e1',
                      cursor: 'pointer',
                      padding: 0,
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                      transition: 'transform 0.1s ease'
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="two-col" style={{ gap: 8 }}>
              {/* Saturday Picker */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#334155', marginBottom: 4 }}>
                  Saturday Colour
                </label>
                <div
                  className="color-btn-wrapper tmm-btn"
                  style={{ height: 30, background: '#fff' }}
                >
                  <span
                    className="color-swatch-indicator"
                    style={{ backgroundColor: saturdayBgColor }}
                  />
                  <span>{saturdayBgColor.toUpperCase()}</span>
                  <input
                    id="saturdayColorInput"
                    type="color"
                    value={saturdayBgColor}
                    onChange={(e) => handleSaturdayChange(e.target.value)}
                  />
                </div>
                {/* Saturday presets */}
                <div style={{ marginTop: 4, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  {PRESET_WEEKEND_COLORS.slice(0, 5).map((preset) => (
                    <button
                      key={`sat-${preset.name}`}
                      type="button"
                      onClick={() => handleApplyPreset(preset.color, 'sat')}
                      title={`Saturday ${preset.name}`}
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 3,
                        backgroundColor: preset.color,
                        border:
                          saturdayBgColor.toLowerCase() === preset.color.toLowerCase()
                            ? '1.5px solid #2d3e51'
                            : '1px solid #cbd5e1',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Sunday Picker */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#334155', marginBottom: 4 }}>
                  Sunday Colour
                </label>
                <div
                  className="color-btn-wrapper tmm-btn"
                  style={{ height: 30, background: '#fff' }}
                >
                  <span
                    className="color-swatch-indicator"
                    style={{ backgroundColor: sundayBgColor }}
                  />
                  <span>{sundayBgColor.toUpperCase()}</span>
                  <input
                    id="sundayColorInput"
                    type="color"
                    value={sundayBgColor}
                    onChange={(e) => handleSundayChange(e.target.value)}
                  />
                </div>
                {/* Sunday presets */}
                <div style={{ marginTop: 4, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  {PRESET_WEEKEND_COLORS.slice(0, 5).map((preset) => (
                    <button
                      key={`sun-${preset.name}`}
                      type="button"
                      onClick={() => handleApplyPreset(preset.color, 'sun')}
                      title={`Sunday ${preset.name}`}
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 3,
                        backgroundColor: preset.color,
                        border:
                          sundayBgColor.toLowerCase() === preset.color.toLowerCase()
                            ? '1.5px solid #2d3e51'
                            : '1px solid #cbd5e1',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Color Headers Checkbox */}
          <div style={{ marginTop: 8 }}>
            <label
              htmlFor="colorWeekendHeadersToggle"
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: '#475569',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer'
              }}
            >
              <input
                id="colorWeekendHeadersToggle"
                type="checkbox"
                checked={colorWeekendHeaders}
                onChange={(e) => onColorWeekendHeadersChange(e.target.checked)}
                style={{ width: 'auto', margin: 0, height: 'auto', cursor: 'pointer' }}
              />
              <span>Also tint column header cells</span>
            </label>
          </div>

          {/* Live Mini Preview Bar */}
          <div
            style={{
              marginTop: 8,
              padding: '6px 8px',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 10.5
            }}
          >
            <span style={{ color: '#64748b', fontWeight: 600 }}>Preview:</span>
            <div style={{ display: 'flex', gap: 4 }}>
              <div
                style={{
                  padding: '2px 8px',
                  borderRadius: 3,
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  color: '#94a3b8'
                }}
              >
                Fri
              </div>
              <div
                style={{
                  padding: '2px 8px',
                  borderRadius: 3,
                  border: '1px solid #cbd5e1',
                  background: saturdayBgColor,
                  color: '#1e293b',
                  fontWeight: 600
                }}
              >
                Sat
              </div>
              <div
                style={{
                  padding: '2px 8px',
                  borderRadius: 3,
                  border: '1px solid #cbd5e1',
                  background: sundayBgColor,
                  color: '#1e293b',
                  fontWeight: 600
                }}
              >
                Sun
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
