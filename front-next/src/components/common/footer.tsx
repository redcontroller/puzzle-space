'use client';

export default function Footer() {
  return (
    <footer
      className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-8"
      style={{
        padding: '24px var(--sizes-layout-padding)',
        marginBottom: 'var(--sizes-nav-height)',
      }}
    >
      <div className="text-xs text-gray-600 dark:text-gray-400 space-y-3">
        {/* 사업자 정보 */}
        <div className="space-y-1">
          <p className="font-medium text-gray-800 dark:text-gray-200">사업자 정보</p>
          <p>(주)온디바이스 | 대표 유동현</p>
          <p>사업자번호: 789-87-65432</p>
          <p>통신판매업 신고번호: 제2025-서울서초-1817호</p>
          <p>주소: 전북 전주시 완산구 풍남문4길 25-2</p>
          <p>개인정보보호책임자: 유동현</p>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-300 dark:border-gray-600 pt-3">
          <div className="space-y-1">
            <p>고객센터: 1877-9721 (토요일, 공휴일 휴무)</p>
            <p>운영시간: 10:00 ~ 18:00 (점심시간 12:00 ~ 13:30)</p>
            <p>비즈니스 제휴 biz@ondvice.com</p>
          </div>
        </div>

        {/* 저작권 */}
        <div className="border-t border-gray-300 dark:border-gray-600 pt-3">
          <p className="text-center font-medium">ⓒ2025 ONDEVICE INC. All Right Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
