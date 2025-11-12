export const AutoTranslationPreferences = () => {
  const messages = useMessages();
  const [autoTranslateEnabled, setAutoTranslateEnabled] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('ko');

  const translationStrings = messages?.userSettings?.preferences?.translation;
  const commonStrings = messages?.common;

  if (!translationStrings || !commonStrings) {
    return null;
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{translationStrings.title}</h3>
      <p className={styles.description}>
        {translationStrings.description}
      </p>
      
      <div className={styles.optionRow}>
        <label htmlFor="auto-translate-toggle">
          {translationStrings.enableLabel}
        </label>
        <input
          id="auto-translate-toggle"
          type="checkbox"
          checked={autoTranslateEnabled}
          onChange={(e) => setAutoTranslateEnabled(e.target.checked)}
          className={styles.autoWidth}
        />
      </div>

      {autoTranslateEnabled && (
        <div className={styles.optionRow}>
          <label htmlFor="target-language">
            {translationStrings.targetLanguageLabel}
          </label>
          <select
            id="target-language"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            <option value="ko">{commonStrings.korean}</option>
            <option value="en">{commonStrings.english}</option>
            <option value="ja">{commonStrings.japanese}</option>
            <option value="zh">{commonStrings.chinese}</option>
          </select>
        </div>
      )}
    </div>
  );
};
