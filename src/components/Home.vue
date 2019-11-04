<template>
  <div>
    <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">{{ slide }} Slide</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <div>
      <p>
        Hiệp hội Phần mềm và Dịch vụ CNTT Việt Nam (VINASA) là một tổ chức phi chính phủ, hoạt động phi lợi nhuận, đại diện cho ngành phần mềm và dịch vụ CNTT Việt nam với mục đích tăng cường hợp tác, hỗ trợ và bảo vệ quyền lợi của các hội viên. VINASA được thành lập ngày 27/04/2002
        Hội viên VINASA hầu hết là các doanh nghiệp hàng đầu tại Việt Nam hoạt động trong lĩnh vực phần mềm và dịch vụ CNTT như VNPT, Mobilefone, Viettel, FPT, CMC, CSC, TMA, Harvey Nash, Global Cybersoft, NEC... Đến tháng 6/2018 VINASA đã có trên 360 doanh nghiệp hội viên phần lớn tại Hà Nội, Tp Hồ Chí Minh và 1 số tỉnh khác. Các thành viên của VINASA chiếm 65% số lập trình viên cả nước và tạo ra 70% giá trị sản phẩm phần mềm tại Việt Nam.
        VINASA hoạt động với vai trò là cầu nối giữa chính phủ và cộng đồng các doanh nghiệp phần mềm và dịch vụ CNTT, hỗ trợ, thúc đẩy sự phát triển và đảm bảo lợi ích cho các thành viên. VINASA có quan hệ rất chặt chẽ với các cơ quan, bộ ngành liên quan, đặc biệt là Bộ Thông tin và Truyền thông; Bộ Khoa học & công nghệ và nhóm ThinkTank là các chuyên gia hàng đầu trong lĩnh vực hoạch định chính sách, kinh tế và CNTT. Điều đó hỗ trợ rất lớn và có tác động mạnh mẽ đến các hoạt động thúc đẩy sự phát triển của ngành phần mềm, CNTT Việt Nam nói chung và của hội viên VINASA nói riêng. Với những đóng góp và cống hiến không ngừng cho sự phát triển của ngành, VINASA đã hân hạnh được nhà nước trao tặng Huân Chương Lao động hạng ba vào tháng 11/2010 và Huân chương lao động hạng hai vào tháng 4/2016.
        Để tạo sự phát triển hài hòa và bảo đảm lợi ích của các hội viên. VINASA hình thành các Câu lạc bộ chuyên về một thị trường như Cậu Lạc bộ Hơp tác CNTT Việt Nam- Nhật Bản ( VJC); chuyên về một lĩnh vực như Câu lạc bộ BPO gồm các doanh nghiệp làm về lĩnh vực BPO; chuyên về Câu Lạc bộ Game và Nội dung số để khích lệ sự phát triển của từng nhóm có chung mối quan tâm.
      </p>
      <p>
        Hiệp hội Phần mềm và Dịch vụ CNTT Việt Nam (VINASA) là một tổ chức phi chính phủ, hoạt động phi lợi nhuận, đại diện cho ngành phần mềm và dịch vụ CNTT Việt nam với mục đích tăng cường hợp tác, hỗ trợ và bảo vệ quyền lợi của các hội viên. VINASA được thành lập ngày 27/04/2002
        Hội viên VINASA hầu hết là các doanh nghiệp hàng đầu tại Việt Nam hoạt động trong lĩnh vực phần mềm và dịch vụ CNTT như VNPT, Mobilefone, Viettel, FPT, CMC, CSC, TMA, Harvey Nash, Global Cybersoft, NEC... Đến tháng 6/2018 VINASA đã có trên 360 doanh nghiệp hội viên phần lớn tại Hà Nội, Tp Hồ Chí Minh và 1 số tỉnh khác. Các thành viên của VINASA chiếm 65% số lập trình viên cả nước và tạo ra 70% giá trị sản phẩm phần mềm tại Việt Nam.
        VINASA hoạt động với vai trò là cầu nối giữa chính phủ và cộng đồng các doanh nghiệp phần mềm và dịch vụ CNTT, hỗ trợ, thúc đẩy sự phát triển và đảm bảo lợi ích cho các thành viên. VINASA có quan hệ rất chặt chẽ với các cơ quan, bộ ngành liên quan, đặc biệt là Bộ Thông tin và Truyền thông; Bộ Khoa học & công nghệ và nhóm ThinkTank là các chuyên gia hàng đầu trong lĩnh vực hoạch định chính sách, kinh tế và CNTT. Điều đó hỗ trợ rất lớn và có tác động mạnh mẽ đến các hoạt động thúc đẩy sự phát triển của ngành phần mềm, CNTT Việt Nam nói chung và của hội viên VINASA nói riêng. Với những đóng góp và cống hiến không ngừng cho sự phát triển của ngành, VINASA đã hân hạnh được nhà nước trao tặng Huân Chương Lao động hạng ba vào tháng 11/2010 và Huân chương lao động hạng hai vào tháng 4/2016.
        Để tạo sự phát triển hài hòa và bảo đảm lợi ích của các hội viên. VINASA hình thành các Câu lạc bộ chuyên về một thị trường như Cậu Lạc bộ Hơp tác CNTT Việt Nam- Nhật Bản ( VJC); chuyên về một lĩnh vực như Câu lạc bộ BPO gồm các doanh nghiệp làm về lĩnh vực BPO; chuyên về Câu Lạc bộ Game và Nội dung số để khích lệ sự phát triển của từng nhóm có chung mối quan tâm.
      </p>
      <p>
        Hiệp hội Phần mềm và Dịch vụ CNTT Việt Nam (VINASA) là một tổ chức phi chính phủ, hoạt động phi lợi nhuận, đại diện cho ngành phần mềm và dịch vụ CNTT Việt nam với mục đích tăng cường hợp tác, hỗ trợ và bảo vệ quyền lợi của các hội viên. VINASA được thành lập ngày 27/04/2002
        Hội viên VINASA hầu hết là các doanh nghiệp hàng đầu tại Việt Nam hoạt động trong lĩnh vực phần mềm và dịch vụ CNTT như VNPT, Mobilefone, Viettel, FPT, CMC, CSC, TMA, Harvey Nash, Global Cybersoft, NEC... Đến tháng 6/2018 VINASA đã có trên 360 doanh nghiệp hội viên phần lớn tại Hà Nội, Tp Hồ Chí Minh và 1 số tỉnh khác. Các thành viên của VINASA chiếm 65% số lập trình viên cả nước và tạo ra 70% giá trị sản phẩm phần mềm tại Việt Nam.
        VINASA hoạt động với vai trò là cầu nối giữa chính phủ và cộng đồng các doanh nghiệp phần mềm và dịch vụ CNTT, hỗ trợ, thúc đẩy sự phát triển và đảm bảo lợi ích cho các thành viên. VINASA có quan hệ rất chặt chẽ với các cơ quan, bộ ngành liên quan, đặc biệt là Bộ Thông tin và Truyền thông; Bộ Khoa học & công nghệ và nhóm ThinkTank là các chuyên gia hàng đầu trong lĩnh vực hoạch định chính sách, kinh tế và CNTT. Điều đó hỗ trợ rất lớn và có tác động mạnh mẽ đến các hoạt động thúc đẩy sự phát triển của ngành phần mềm, CNTT Việt Nam nói chung và của hội viên VINASA nói riêng. Với những đóng góp và cống hiến không ngừng cho sự phát triển của ngành, VINASA đã hân hạnh được nhà nước trao tặng Huân Chương Lao động hạng ba vào tháng 11/2010 và Huân chương lao động hạng hai vào tháng 4/2016.
        Để tạo sự phát triển hài hòa và bảo đảm lợi ích của các hội viên. VINASA hình thành các Câu lạc bộ chuyên về một thị trường như Cậu Lạc bộ Hơp tác CNTT Việt Nam- Nhật Bản ( VJC); chuyên về một lĩnh vực như Câu lạc bộ BPO gồm các doanh nghiệp làm về lĩnh vực BPO; chuyên về Câu Lạc bộ Game và Nội dung số để khích lệ sự phát triển của từng nhóm có chung mối quan tâm.
      </p>
      <p>
        Hiệp hội Phần mềm và Dịch vụ CNTT Việt Nam (VINASA) là một tổ chức phi chính phủ, hoạt động phi lợi nhuận, đại diện cho ngành phần mềm và dịch vụ CNTT Việt nam với mục đích tăng cường hợp tác, hỗ trợ và bảo vệ quyền lợi của các hội viên. VINASA được thành lập ngày 27/04/2002
        Hội viên VINASA hầu hết là các doanh nghiệp hàng đầu tại Việt Nam hoạt động trong lĩnh vực phần mềm và dịch vụ CNTT như VNPT, Mobilefone, Viettel, FPT, CMC, CSC, TMA, Harvey Nash, Global Cybersoft, NEC... Đến tháng 6/2018 VINASA đã có trên 360 doanh nghiệp hội viên phần lớn tại Hà Nội, Tp Hồ Chí Minh và 1 số tỉnh khác. Các thành viên của VINASA chiếm 65% số lập trình viên cả nước và tạo ra 70% giá trị sản phẩm phần mềm tại Việt Nam.
        VINASA hoạt động với vai trò là cầu nối giữa chính phủ và cộng đồng các doanh nghiệp phần mềm và dịch vụ CNTT, hỗ trợ, thúc đẩy sự phát triển và đảm bảo lợi ích cho các thành viên. VINASA có quan hệ rất chặt chẽ với các cơ quan, bộ ngành liên quan, đặc biệt là Bộ Thông tin và Truyền thông; Bộ Khoa học & công nghệ và nhóm ThinkTank là các chuyên gia hàng đầu trong lĩnh vực hoạch định chính sách, kinh tế và CNTT. Điều đó hỗ trợ rất lớn và có tác động mạnh mẽ đến các hoạt động thúc đẩy sự phát triển của ngành phần mềm, CNTT Việt Nam nói chung và của hội viên VINASA nói riêng. Với những đóng góp và cống hiến không ngừng cho sự phát triển của ngành, VINASA đã hân hạnh được nhà nước trao tặng Huân Chương Lao động hạng ba vào tháng 11/2010 và Huân chương lao động hạng hai vào tháng 4/2016.
        Để tạo sự phát triển hài hòa và bảo đảm lợi ích của các hội viên. VINASA hình thành các Câu lạc bộ chuyên về một thị trường như Cậu Lạc bộ Hơp tác CNTT Việt Nam- Nhật Bản ( VJC); chuyên về một lĩnh vực như Câu lạc bộ BPO gồm các doanh nghiệp làm về lĩnh vực BPO; chuyên về Câu Lạc bộ Game và Nội dung số để khích lệ sự phát triển của từng nhóm có chung mối quan tâm.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"]
    };
  }
};
</script>

<style scoped>
</style>