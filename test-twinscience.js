// TwinScience Manual Testing Guide
// Run this in browser console to test functionality

console.log('🧪 TwinScience Testing Suite');

// Test 1: RTL Language Switching
function testRTLSwitch() {
    console.log('🔄 Testing RTL Language Switch...');
    
    // Find language switch button
    const langButton = document.querySelector('button[aria-label*="التبديل"]') || 
                      document.querySelector('button[aria-label*="Switch"]');
    
    if (langButton) {
        console.log('✅ Language switch button found');
        // Simulate click to test RTL
        langButton.click();
        
        setTimeout(() => {
            const isRTL = document.documentElement.dir === 'rtl' || 
                         document.body.dir === 'rtl' ||
                         document.querySelector('[dir="rtl"]');
            console.log('🔍 RTL Mode Active:', !!isRTL);
            
            // Test arrow direction in episode cards
            const arrows = document.querySelectorAll('.episode-card svg[stroke-linecap="round"]');
            console.log('🏹 Found arrow elements:', arrows.length);
            
        }, 1000);
    } else {
        console.log('❌ Language switch button not found');
    }
}

// Test 2: Episode Card Modal Opening
function testEpisodeModal() {
    console.log('📱 Testing Episode Modal...');
    
    const openButton = document.querySelector('button[class*="Open Wiki-Article"]') ||
                      document.querySelector('button:contains("Open")');
    
    if (openButton) {
        console.log('✅ Episode open button found');
        openButton.click();
        
        setTimeout(() => {
            const modal = document.querySelector('[role="dialog"]') ||
                         document.querySelector('.modal') ||
                         document.querySelector('[class*="modal"]');
            console.log('🪟 Modal opened:', !!modal);
            
            // Test tabs
            const tabs = document.querySelectorAll('button[role="tab"], .tab, [class*="tab"]');
            console.log('📑 Found tabs:', tabs.length);
            
        }, 500);
    } else {
        console.log('❌ Episode open button not found');
    }
}

// Test 3: Article Content Loading
function testArticleContent() {
    console.log('📄 Testing Article Content...');
    
    // Look for article content container
    const articleContent = document.querySelector('.article-content') ||
                          document.querySelector('[class*="article"]');
    
    if (articleContent) {
        console.log('✅ Article content container found');
        console.log('📝 Content length:', articleContent.textContent?.length || 0);
        
        // Test comment features
        const commentButton = document.querySelector('button[class*="comment"]') ||
                             document.querySelector('textarea[placeholder*="comment"]');
        console.log('💬 Comment features found:', !!commentButton);
        
    } else {
        console.log('❌ Article content not found');
    }
}

// Test 4: Premium Features
function testPremiumFeatures() {
    console.log('👑 Testing Premium Features...');
    
    // Look for subscription elements
    const premiumElements = document.querySelectorAll('[class*="premium"], [class*="subscription"], .crown, [class*="crown"]');
    console.log('💎 Premium elements found:', premiumElements.length);
    
    // Test subscription buttons
    const subscribeButtons = document.querySelectorAll('button[class*="Subscribe"], button[class*="premium"]');
    console.log('🔐 Subscribe buttons found:', subscribeButtons.length);
    
    if (subscribeButtons.length > 0) {
        console.log('✅ Premium subscription system implemented');
    }
}

// Test 5: Translation System
function testTranslations() {
    console.log('🌐 Testing Translation System...');
    
    // Check for i18n attributes and translated content
    const translatedElements = document.querySelectorAll('[data-i18n], [class*="t-"]');
    console.log('🗣️ Elements with translations:', translatedElements.length);
    
    // Look for Arabic text
    const arabicRegex = /[\u0600-\u06FF]/;
    const allText = document.body.textContent || '';
    const hasArabic = arabicRegex.test(allText);
    console.log('🇸🇦 Arabic text detected:', hasArabic);
}

// Run all tests
function runAllTests() {
    console.log('🚀 Running TwinScience Test Suite...');
    console.log('='.repeat(50));
    
    testRTLSwitch();
    setTimeout(testEpisodeModal, 2000);
    setTimeout(testArticleContent, 3000);
    setTimeout(testPremiumFeatures, 4000);
    setTimeout(testTranslations, 5000);
    
    setTimeout(() => {
        console.log('='.repeat(50));
        console.log('✅ Test Suite Complete!');
        console.log('Check console output above for detailed results.');
    }, 6000);
}

// Auto-run if this script is loaded
if (typeof window !== 'undefined') {
    runAllTests();
}