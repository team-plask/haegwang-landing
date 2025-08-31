"use client";

import React from 'react';
import { Document, Page, Text, View, Image, Font } from '@react-pdf/renderer';
import { createTw } from 'react-pdf-tailwind';
import { LawyerProfileFromDB } from '@/sections/lawyers/lawyer-profile-section';
import { Json } from '@/database.types';

// 로컬 TTF 파일 사용 - 다양한 weight 등록
Font.register({
  family: 'Pretendard',
  src: '/font/PretendardVariable.ttf'
});

Font.register({
  family: 'PretendardBold',
  src: '/font/PretendardBold.ttf'
});

Font.register({
  family: 'PretendardSemiBold',
  src: '/font/PretendardSemiBold.ttf'
});

// Tailwind 설정 - 다양한 fontWeight 추가
const tw = createTw({
    fontFamily: {
      sans: ['Pretendard'],
      bold: ['PretendardBold'],
      semibold: ['PretendardSemiBold'],
    },
    colors: {
      brand: '#1a365d',
      backgroundBrand: '#445C7D',
      gray: {
        100: '#f7fafc',
        200: '#edf2f7',
        300: '#cbd5e0',
        600: '#718096',
        700: '#4a5568',
        800: '#2d3748',
      },
      white: '#ffffff',
    }
});



interface LawyerPDFTemplateProps {
  lawyer: LawyerProfileFromDB & {
    education?: Json;
    experience?: Json;
    awards_publications?: Json;
    cases?: Array<{
      id: string;
      title: string;
      practice_area?: {
        id: string;
        area_name: string;
        slug: string;
      } | null;
    }>;
  };
}

export const LawyerPDFTemplate = ({ lawyer }: LawyerPDFTemplateProps) => {
  // 데이터 포맷팅 함수들
  const formatEducationData = (education: Json) => {
    if (!education || !Array.isArray(education)) return [];
    return education.map((item) => {
      const typedItem = item as { title?: string; description?: string };
      return {
        title: typedItem.title || '',
        description: typedItem.description || '',
      };
    });
  };

  const formatExperienceData = (experience: Json) => {
    if (!experience) return { experience: [], award: [] };
    
    if (typeof experience === 'object' && experience !== null && 'experience' in experience) {
      const exp = experience as { experience?: unknown[]; award?: unknown[] };
      return {
        experience: Array.isArray(exp.experience) ? exp.experience : [],
        award: Array.isArray(exp.award) ? exp.award : [],
      };
    }
    
    if (Array.isArray(experience)) {
      return { experience, award: [] };
    }
    
    return { experience: [], award: [] };
  };

  const formatAwardsPublicationsData = (awardsPublications: Json) => {
    if (!awardsPublications || !Array.isArray(awardsPublications)) return [];
    
    const firstEntry = awardsPublications[0];
    const isSimpleFormat = firstEntry && 
      typeof firstEntry === 'object' && 
      firstEntry !== null &&
      'title' in firstEntry && 
      !('type' in firstEntry);

    if (isSimpleFormat) {
      return awardsPublications.map((item) => {
        const typedItem = item as { title?: string; description?: string };
        return {
          title: typedItem.title || '',
          description: typedItem.description || '',
        };
      });
    } else {
      return awardsPublications.map((item) => {
        const typedItem = item as { title?: string; type?: string; issuer_or_publisher?: string; year?: string };
        return {
          title: `${typedItem.type === "award" ? "수상" : typedItem.type === "book" ? "저서" : "논문/활동"}: ${typedItem.title} (${typedItem.issuer_or_publisher}, ${typedItem.year})`,
          description: '',
        };
      });
    }
  };

  const formatCasesData = (cases: Array<{
    id: string;
    title: string;
    practice_area?: {
      id: string;
      area_name: string;
      slug: string;
    } | null;
  }> | undefined) => {
    if (!cases || !Array.isArray(cases)) return [];
    return cases.map((item) => ({
      title: item.title || '',
      area: item.practice_area?.area_name || '',
    }));
  };

  const educationData = formatEducationData(lawyer.education || null);
  const experienceData = formatExperienceData(lawyer.experience || null);
  const awardsData = formatAwardsPublicationsData(lawyer.awards_publications || null);
  const casesData = formatCasesData(lawyer.cases);

  return (
    <Document>
      <Page size="A4" style={{ fontFamily: 'Pretendard', paddingTop: 50, paddingBottom: 50, paddingLeft: 0, paddingRight: 0 }} wrap={true}>
        {/* 상단 브랜드 섹션 - 파란색 배경 (여백 없이 전체 너비, 음수 마진으로 상단 여백 무시) */}
        <View style={[tw("bg-brand text-white p-8 relative"), { marginTop: -50, marginLeft: 0, marginRight: 0 }]}>
          {/* 프로필 이미지 - 오른쪽 오버레이 */}
          {lawyer.profile_original_url && (
            <View style={tw("absolute right-8 top-8 bottom-0 w-64")}>
              <Image 
                src={lawyer.profile_original_url} 
                style={tw("w-full h-full object-cover object-top rounded-lg")}
              />
            </View>
          )}

          {/* 로고 - 왼쪽 상단 */}
          {/* <View style={tw("absolute left-8 top-8")}>
            <Image 
              src="/logo/logo_white.png" 
              style={tw("h-6 mb-8")}
            />
          </View> */}

          {/* 내부 컨텐츠를 위한 여백 컨테이너 */}
          <View style={tw("mx-8")}>
            {/* 왼쪽 정보 영역 */}
            <View style={tw("pr-72 pt-12")}>
              {/* 이름과 직책 */}
              <View style={tw("mb-6")}>
                <Text style={tw("text-5xl text-white mb-4 font-bold")}>
                  {lawyer.name}
                </Text>
                <Text style={tw("text-xl text-gray-300")}>
                  {lawyer.lawyer_type || '변호사'}
                </Text>
              </View>

              {/* 전문분야 배지들 */}
              {lawyer.practice_areas && lawyer.practice_areas.length > 0 && (
                <View style={tw("mb-6")}>
                  <View style={tw("flex-row flex-wrap")}>
                    {lawyer.practice_areas.map((area, index) => (
                      <View key={index} style={tw("bg-backgroundBrand px-3 py-2 rounded-full mr-2 mb-2")}>
                        <Text style={tw("text-xs text-white font-semibold")}>
                          #{area.area_name}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* 연락처 정보 */}
              <View style={tw("pt-4")}>
                {lawyer.phone_number && (
                  <View style={tw("flex-row items-center mb-3")}>
                    <Text style={tw("text-sm text-gray-300 w-16 font-semibold")}>Tel</Text>
                    <Text style={tw("text-sm text-gray-300")}>{lawyer.phone_number}</Text>
                  </View>
                )}
                {lawyer.email && (
                  <View style={tw("flex-row items-center mb-3")}>
                    <Text style={tw("text-sm text-gray-300 w-16 font-semibold")}>E-mail</Text>
                    <Text style={tw("text-sm text-gray-300")}>{lawyer.email.toLowerCase()}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* 하단 흰색 배경 섹션들 - 여백 적용, 푸터를 위한 하단 여백 추가 */}
        <View style={tw("px-16 pt-12 pb-20")}>

          {/* 주요 경력 */}
          {experienceData.experience.length > 0 && (
            <View style={tw("mb-8")} break={false}>
              <Text style={tw("text-xl text-gray-800 mb-2 pb-2 border-b border-gray-300 font-bold")}>
                주요 경력
              </Text>
              {experienceData.experience.map((item, index: number) => {
                const typedItem = item as { title?: string; description?: string };
                return (
                  <View key={index} style={tw("flex-row mb-3")}>
                    <Text style={[tw("text-sm text-gray-600 flex-1 leading-relaxed"), {marginBottom: -2}]}>
                     •  {typedItem.title}{typedItem.description ? ` - ${typedItem.description}` : ''}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}

          {/* 수상 경력 */}
          {experienceData.award.length > 0 && (
            <View style={tw("mb-8")} break={false}>
              <Text style={tw("text-xl text-gray-800 mb-2 pb-2 border-b border-gray-300 font-bold")}>
                수상 경력
              </Text>
              {experienceData.award.map((item, index: number) => {
                const typedItem = item as { title?: string; description?: string };
                return (
                  <View key={index} style={tw("flex-row mb-3")}>
                    <Text style={[tw("text-sm text-gray-600 flex-1 leading-relaxed")]}>
                     •  {typedItem.title}{typedItem.description ? ` - ${typedItem.description}` : ''}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}

          {/* 논문/저서 */}
          {awardsData.length > 0 && (
            <View style={tw("mb-8")} break={false}>
              <Text style={tw("text-xl text-gray-800 mb-2 pb-2 border-b border-gray-300 font-bold")}>
                논문/저서
              </Text>
              {awardsData.map((item, index) => (
                <View key={index} style={tw("flex-row mb-3")}>
                  <Text style={[tw("text-sm text-gray-600 flex-1 leading-relaxed")]}>
                   •  {item.title}{item.description ? ` - ${item.description}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* 학력 */}
          {educationData.length > 0 && (
            <View style={tw("mb-8")} break={false}>
              <Text style={tw("text-xl text-gray-800 mb-2 pb-2 border-b border-gray-300 font-bold")}>
                학력
              </Text>
              {educationData.map((item, index) => (
                <View key={index} style={tw("flex-row mb-3")}>
                  <Text style={tw("text-sm text-gray-600 flex-1 leading-relaxed")}>
                   •  {item.title}{item.description ? ` - ${item.description}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* 업무 사례 */}
          {casesData.length > 0 && (
            <View style={tw("mb-8")} break={false}>
              <Text style={tw("text-xl text-gray-800 mb-2 pb-2 border-b border-gray-300 font-bold")}>
                업무 사례
              </Text>
              {casesData.map((item, index) => (
                <View key={index} style={tw("flex-row mb-3")}>
                  <Text style={[tw("text-sm text-gray-600 flex-1 leading-relaxed")]}>
                   •  {item.title}{item.area ? ` (${item.area})` : ''}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
        
        {/* 각 페이지 하단 푸터 - 고정, 전체 너비 브랜드 색상 배경 */}
        <View 
          style={{
            position: 'absolute', 
            bottom: 0, 
            right: 0, 
            left: 0,
            paddingVertical: 30,
            paddingHorizontal: 30,
            marginTop: 20,
          }} 
          fixed
        >
          {/* 웹사이트 주소와 페이지 번호 */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
            <Image 
                src={"/logo/logo.png"} 
                style={tw("h-6")}
              />
          </View>
        </View>
      </Page>
    </Document>
  );
};
