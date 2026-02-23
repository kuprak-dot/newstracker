// src/data/newsData.js

export const newsData = [
    {
        id: "n1",
        title: "Ünlü İş İnsanı A.Y. Yolsuzluk İddialarıyla Tutuklandı",
        summary: "Büyük ölçekli bir ihaleye fesat karıştırmak ve evrakta sahtecilik suçlamalarıyla gözaltına alınan A.Y. çıkarıldığı mahkemece tutuklanarak cezaevine gönderildi.",
        detail: "Geçtiğimiz hafta başlatılan 'Temiz Eller' operasyonu kapsamında gözaltına alınan ünlü iş insanı A.Y. ve beraberindeki 4 kişi, adliyedeki işlemlerinin ardından tutuklama talebiyle nöbetçi mahkemeye sevk edildi. Mahkeme, delillerin karartılma şüphesi ve kaçma ihtimalini göz önünde bulundurarak şüphelilerin tamamının tutuklanmasına hükmetti. Operasyonun genişleyebileceği belirtiliyor.",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 gün önce
        source: "Haber Ajansı",
        trackableEntities: [
            { id: "e1", type: "person", name: "İş İnsanı A.Y.", triggerEventId: "u1" }
        ]
    },
    {
        id: "n2",
        title: "Merkez Bankası Beklenen Faiz Kararını Açıkladı",
        summary: "Piyasaların merakla beklediği faiz kararı açıklandı. Politika faizi %45 düzeyinde sabit tutuldu. Karar metninde enflasyon vurgusu dikkat çekti.",
        detail: "Para Politikası Kurulu (PPK) bugün yaptığı toplantının ardından faiz oranlarında değişikliğe gitmediğini duyurdu. Yapılan açıklamada, 'Aylık enflasyonun ana eğiliminde belirgin ve kalıcı bir düşüş sağlanana kadar sıkı para politikası duruşu sürdürülecektir' denildi. Kararın ardından döviz kurlarında yatay bir seyir izlendi.",
        date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 saat önce
        source: "Ekonomi Servisi",
        trackableEntities: [
            { id: "e2", type: "topic", name: "Merkez Bankası Faiz Kararları", triggerEventId: "u2" }
        ]
    },
    {
        id: "n3",
        title: "Yeni Metro Hattı İnşaatı Başladı: 2 Yıl İçinde Tamamlanacak",
        summary: "Şehrin batı ve doğu yakasını birbirine bağlayacak olan yeni 'Mavi Hat' metro projesinin temelleri atıldı. Proje trafik sorununu büyük ölçüde hafifletecek.",
        detail: "Batı Yakası ile Doğu Organize Sanayi Bölgesini birleştirecek 25 kilometrelik yeni hattın temel atma töreni törenle gerçekleştirildi. Belediye Başkanı törende yaptığı konuşmada, 14 istasyondan oluşacak hattın tam 24 ay içinde, şubat 2028'de hizmete girmesi için çalışmaların 7/24 esasına göre yürütüleceğini müjdeledi.",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 gün önce
        source: "Kent Bülteni",
        trackableEntities: [
            { id: "e3", type: "project", name: "Mavi Hat Metro Projesi", triggerEventId: "u3" }
        ]
    }
];
