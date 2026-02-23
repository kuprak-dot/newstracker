// src/data/updatesData.js

// Güncellemeler, takip edilen bir entity'ye ait olduğunda tetiklenecek verilerdir.
// Gerçek bir uygulamada bu veriler push notification veya polling ile sunucudan gelir.

export const updatesData = [
    {
        id: "u1", // newsData.js'deki A.Y. haberi içindeki triggerEventId ile eşleşiyor
        entityId: "e1",
        title: "A.Y. Davasında Flaş Gelişme!",
        updateSummary: "İş insanı A.Y., avukatlarının yaptığı itiraz üzerine adli kontrol şartıyla tutuksuz yargılanmak üzere serbest bırakıldı.",
        updateDetail: "Üst mahkemeye yapılan tutukluluğa itiraz başvurusu bugün karara bağlandı. Mahkeme, delillerin toplanmış olması ve sabit ikametgah sahibi olmasını gerekçe göstererek A.Y.'nin yurtdışı çıkış yasağı ve haftada iki gün karakola imza verme adli kontrol şartlarıyla serbest bırakılmasına hükmetti. Dava tutuksuz olarak devam edecek.",
        date: new Date().toISOString(), // Şu an (bildirim olarak gelecek)
        type: "status_change", // tutuklu -> serbest
        relatedNewsId: "n1" // Eski haberi referans etmek için
    },
    {
        id: "u2",
        entityId: "e2",
        title: "Merkez Bankası'ndan Sürpriz Ara Toplantı Kararı",
        updateSummary: "Kurul, piyasa oynaklıklarını değerlendirmek üzere önümüzdeki hafta olağanüstü toplanacağını duyurdu.",
        updateDetail: "Küresel piyasalardaki son dalgalanmaların ardından PPK, takvim dışı bir toplantı gerçekleştirerek durumu yeniden ele alacağını açıkladı. Beklentiler, ek sıkılaştırma adımlarının masada olduğu yönünde.",
        date: new Date().toISOString(),
        type: "new_development",
        relatedNewsId: "n2"
    },
    {
        id: "u3",
        entityId: "e3",
        title: "Mavi Hat Projesinde Gecikme Sinyali",
        updateSummary: "Yeraltı çalışmalarında karşılaşılan sert kayalık zemin nedeniyle proje bitiş tarihinin 6 ay ertelenebileceği açıklandı.",
        updateDetail: "Ana yüklenici firma tarafından yapılan basın açıklamasında, 4. ve 5. istasyonlar arasındaki jeolojik raporların ötesinde bir sert zeminle karşılaşıldığı, bu durumun TBM cihazlarının ilerleyişini yavaşlattığı belirtildi. Bitiş hedefinin Ağustos 2028'e sarkabileceği öngörülüyor.",
        date: new Date().toISOString(),
        type: "timeline_update",
        relatedNewsId: "n3"
    }
]
