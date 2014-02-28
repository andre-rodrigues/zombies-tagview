package br.com.tagview.zombies;

import android.os.Bundle;
import android.app.Activity;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class MainActivity extends Activity {

    private WebView webView;
    private final String LOCALHOST_URL = "http://10.0.2.2:5000"; // to run on emulator
    private final String SERVER_URL = "http://192.168.1.4:5000";
	
	@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        
        setContentView(R.layout.activity_main);
        
    	webView = (WebView) findViewById(R.id.webView1);
    	
    	webView.getSettings().setJavaScriptEnabled(true);
    	
    	webView.loadUrl("file:///android_asset/index.html");
    }
}
