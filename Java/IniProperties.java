

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

/**
 * クラスパスに配置したプロパティファイルを読み込むためのローダー
 *
 */
public enum IniProperties {
	connURL,
	connUID,
	connPWD
	;

	/** 値. */
	public String value;

	/** メッセージプロパティファイルパス. */
	private static final String FILE_PATH = "/ini.properties";

	/**
	 * インスタンス禁止
	 */
	private IniProperties() {
	}

	/**
	 * 指定のパスからプロパティファイルを読み込む
	 *
	 * @param className
	 *            例 /application.properties
	 * @return Propertiesオブジェクト
	 * @throws IOException
	 */
	static {
		try {
			try (InputStream is = IniProperties.class.getResourceAsStream(FILE_PATH);
					InputStreamReader isr = new InputStreamReader(is, "UTF-8");
					BufferedReader reader = new BufferedReader(isr)) {
				Properties result = new Properties();
				// Properties#load() で渡す Reader オブジェクトを UTF-8 エンコーディング指定して生成した
				// InputStreamReader オブジェクトにする
				result.load(reader);

				for (IniProperties key : IniProperties.values()) {
					IniProperties.valueOf(key.name()).value = result.getProperty(key.name());
				}
			}

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * キーと値の文字列取得(デバッグ用).
	 *
	 * @return デバッグ文字列
	 */
	public static Object[] getValueStrings() {
		List<String> bu = new ArrayList<String>();
		for (IniProperties key : IniProperties.values()) {
			bu.add(key.name() + "=" + key.value);
		}
		return bu.toArray();
	}

	/**
	 * テスト用メインメソッド.
	 *
	 * @param args
	 *            引数
	 */
	public static void main(String[] args) {
		for (Object string : IniProperties.getValueStrings()) {
			System.out.println(string);
		}
	}
}
