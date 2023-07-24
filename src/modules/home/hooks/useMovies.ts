"use client";

import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { HomeService } from "../services";
import { getYoutubeVideoId } from "../utils";
import { Movie } from "../types";
import { useAuthContext } from "@/modules/auth";

const data = [
  {
    id: "1",
    title: "Movie title",
    description: "Movie description",
    thumbnail: "",
    shared_by: "Shared by",
  },
  {
    id: "2",
    title:
      "Tập 12 Uncut | SNN 2020 | Khánh Vân công khai với Nam Thư, Diệu Nhi hoang mang tìm đồng đội",
    description: `❤ Cảm ơn Ca sĩ Thái Trinh & Team đã cho phép Sao nhập ngũ sử dụng ca khúc Cover "Pictures of My heart" trong Tập 12 Sao nhập ngũ 2020.
  🔥 Sao nhập ngũ 2020 – Nữ chiến binh hứa hẹn nhiều bất ngờ với dàn cast đình đàm: Nghệ sỹ Diệu Nhi, Nam Thư, Hoa hậu Kỳ Duyên, Youtuber Hậu Hoàng, Ca sĩ Dương Hoàng Yến, Diễn viên Đỗ Khánh Vân. Trải nghiệm các nội dung tại Lữ đoàn Đặc công bộ, ai sẽ soán ngôi “lầy” của Hoa hậu Hương Giang SS4? 
  🔥 Link Full mùa 2020-2021: https://bom.to/qKfbwVwv
  🔥 Xem sớm nhất trên ứng dụng Mocha - Free 3G/4G đối với thuê bao Viettel - Xem thỏa sức - giải trí hết mình: http://video.mocha.com.vn/Sao-Nhap-Ngu-cn2703
  🔥 Đón xem Sao nhập ngũ 2020 trong các khung giờ: 
       💓 12H00 Thứ 7 trên Kênh TH QPVN
       💓 08h00 Chủ nhật trên VTV3
       💓 09H00 Chủ nhật trên Mocha & Keeng Movies
       💓 10h00 Chủ nhật trên Kênh Youtube: Sao nhập ngũ - QPVN
  🔥 Production Team
  • Tổng đạo diễn: Lương Hải Khoa
  • Đạo diễn: Lê Quý Giáp & Lê Đức Cường
  • Tổ chức sản xuất: Nguyễn Nga
  • Biên tập: Phạm Thanh Hảo
  • D.O.P: Đoàn Ngọc Ước 
  • Quay phim: Mai Trùng Khánh; Thái Ngân; Thế Chiến, Ngọc Thắng, Văn Thảo, Tuấn Vũ, Mạnh Cường, Thành Nam, Quang Huy, Huy Tuấn, Vũ Sướng
  • Kỹ thuật & Ánh sáng: Đỗ Duy Sỹ, Thành Nguyên, Đức Chính, Văn Hà, Minh Tuyến
  • Âm thanh: Đoàn Lộc & Nguyễn Tới
  • Hỗ trợ sản xuất: Văn Hải, Ngọc Hoàng, Anh Tuấn, Triệu Hương, Văn Huệ, Minh Tân
  • Editor: Hải Khoa Lương, Cường Lê, Quý Giáp, Thanh Hảo, Leo Kay; Thanh Liêm, Thanh Tùng, Anh Đức, Hiệp Cine
  • Đồ họa: Phùng Tùng & HaoMi & Hannah Ru & Cao Hà
  • Truyền thông: Nga Nguyễn, Trần Phương, Giang Bùm, Linh Bá
  • Bảo trợ truyền thông: Tiin.vn
  =========================================
  Cài ngay app Xgaming tại http://xgaming.com.vn/app để theo dõi và tham gia chảo lửa thách đấu cùng những streamers hot nhất các tựa game
  ★ Fanpage: https://www.facebook.com/xgamingvtm
  ★ Website: http://xgaming.com.vn/
  -----------------------------------------------------------------------------
  © Bản quyền thuộc về Viettel Media
  LH quảng cáo tài trợ: 0965079955/0985903900`,
    thumbnail: "https://i.ytimg.com/vi/AoUHptyZU7k/sddefault.jpg",
    shared_by: "Shared by",
  },
] as any;

type Period = {
  page?: number;
  limited?: boolean;
  pageSize?: number;
  refresh?: boolean;
  loadMore?: boolean;
};

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [period, setPeriod] = useState({
    page: 0,
    limited: false,
    pageSize: 20,
    refresh: false,
    loadMore: false,
  });

  const {currentUser} = useAuthContext();

  const [isSharing, setIsSharing] = useState(false);

  const getMovies = useCallback(async (param: Period) => {
    try {
      setPeriod((preState) => ({
        ...preState,
        ...param
      }));
      const lastMovieId = movies[movies.length - 1]?.id;
      const lastMovieIdParam = param.refresh ? undefined : lastMovieId;
      const response = await HomeService.getMovies(period.pageSize, lastMovieIdParam);
      if (response.status ==="success" && response.result) {
        setMovies(response.result || []);
        setPeriod((preState) => ({
          ...preState,
          loadMore: false,
          refresh: false,
          limited: (response.result?.length || 0) < period.pageSize,
        }));
      } else {
        setPeriod((preState) => ({
          ...preState,
          loadMore: false,
          refresh: false,
        }));
      }
    } catch (error) {
      setPeriod((preState) => ({
        ...preState,
        loadMore: false,
        refresh: false,
        limited: true,
      }));
    }
  }, [movies, period.pageSize]);

  const shareMovie = useCallback(async (youtubeLink: string) => {
    try {
      const videoId = getYoutubeVideoId(youtubeLink);
      if (!videoId) {
        return;
      }
      setIsSharing(true);
      let title = "Movie title";
      let description = "Movie description";
      let thumbnail = "";
      const youtubeInfo = await HomeService.getYoutubeVideoInfo(videoId);
      if (youtubeInfo && youtubeInfo.items && youtubeInfo.items.length > 0) {
        title = youtubeInfo.items[0].snippet?.title ?? title;
        description = youtubeInfo.items[0].snippet?.description ?? description;
        thumbnail =
          youtubeInfo.items[0].snippet?.thumbnails?.standard?.url ?? thumbnail;
        const response = await HomeService.shareMovie({
          title,
          description,
          thumbnail,
          youtube_id: videoId,
          shared_by: currentUser?.email ?? "",
        });
        setIsSharing(false);
        if (response.status === "success" && response.result) {
          toast("Share successfully", {
            type: "success",
          });
          setMovies([response.result, ...movies]);
        }
      }
    } catch (error: any) {
      toast(error.message, {
        type: "error",
      });
      setIsSharing(false);
    }
  }, [currentUser?.email, movies]);

  return {
    movies,
    period,
    getMovies,
    shareMovie,
    isSharing,
    setMovies
  };
};
