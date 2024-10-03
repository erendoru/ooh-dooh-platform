import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentBillboards() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/billboards/01.png" alt="Billboard" />
          <AvatarFallback>B1</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Merkez Meydanı</p>
          <p className="text-sm text-muted-foreground">5m x 10m, LED Ekran</p>
        </div>
        <div className="ml-auto font-medium">234,567 Gösterim</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/billboards/02.png" alt="Billboard" />
          <AvatarFallback>B2</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sahil Yolu</p>
          <p className="text-sm text-muted-foreground">3m x 6m, Statik</p>
        </div>
        <div className="ml-auto font-medium">189,234 Gösterim</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/billboards/03.png" alt="Billboard" />
          <AvatarFallback>B3</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">AVM Girişi</p>
          <p className="text-sm text-muted-foreground">
            4m x 8m, Dijital Ekran
          </p>
        </div>
        <div className="ml-auto font-medium">156,789 Gösterim</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/billboards/04.png" alt="Billboard" />
          <AvatarFallback>B4</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Havalimanı Yolu</p>
          <p className="text-sm text-muted-foreground">6m x 12m, LED Ekran</p>
        </div>
        <div className="ml-auto font-medium">123,456 Gösterim</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/billboards/05.png" alt="Billboard" />
          <AvatarFallback>B5</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Otogar Çıkışı</p>
          <p className="text-sm text-muted-foreground">4m x 6m, Statik</p>
        </div>
        <div className="ml-auto font-medium">98,765 Gösterim</div>
      </div>
    </div>
  );
}
