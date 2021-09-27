package uk.ac.bristol.spe.ePortFolioRepo;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import uk.ac.bristol.spe.ePortFolioRepo.controllers.AssetModelController;
import uk.ac.bristol.spe.ePortFolioRepo.controllers.PostController;
import uk.ac.bristol.spe.ePortFolioRepo.controllers.UserController;

@SpringBootTest
@AutoConfigureMockMvc
class RestControllerTests {

  @Autowired private UserController userController;
  @Autowired private PostController postController;
  @Autowired private AssetModelController assetModelController;

  @Autowired private MockMvc mockMvc;
  @Autowired private ObjectMapper objectMapper;

  @Test
  public void contextLoads() {
    Assertions.assertThat(userController).isNotNull();
    Assertions.assertThat(postController).isNotNull();
    Assertions.assertThat(assetModelController).isNotNull();
  }

  //  @Test
  //  public void testMockMVC() throws Exception {
  //    mockMvc.perform(MockMvcRequestBuilders.get("/")).andDo(MockMvcResultHandlers.print());
  //  }
  //
  //  @Test
  //  public void addUser() throws Exception {
  //    SignUpForm user1 =
  //        new SignUpForm("John", "Doe", "jdoe", "j.doe@testing.c", "face", "My description");
  //
  //    mockMvc
  //        .perform(
  //            MockMvcRequestBuilders.post("/signup", 42L)
  //                .header("Access-Control-Request-Method", "Post")
  //                .header("Origin", "http://localhost:5000")
  //                .contentType("application/json")
  //                .content(objectMapper.writeValueAsString(user1)))
  //        .andExpect(status().is2xxSuccessful())
  //        .andDo(MockMvcResultHandlers.print());
  //  }
  //
  //  @Test
  //  public void noDuplicateUsernames() throws Exception {
  //    SignUpForm user1 =
  //        new SignUpForm(
  //            "Joel", "Tester", "joelgg", "joel.tester@testing.c", "fdas", "My description");
  //    SignUpForm user2 =
  //        new SignUpForm("Matt", "Matta", "joelgg", "matt.matta@testing.c", "xzcv", "My
  // description");
  //
  //    mockMvc
  //        .perform(
  //            MockMvcRequestBuilders.post("/signup")
  //                .header("Access-Control-Request-Method", "Post")
  //                .header("Origin", "http://localhost:5000")
  //                .contentType("application/json")
  //                .content(objectMapper.writeValueAsString(user1)))
  //        .andExpect(status().is2xxSuccessful())
  //        .andDo(MockMvcResultHandlers.print());
  //
  //    mockMvc
  //        .perform(
  //            MockMvcRequestBuilders.post("/signup")
  //                .header("Access-Control-Request-Method", "Post")
  //                .header("Origin", "http://localhost:5000")
  //                .contentType("application/json")
  //                .content(objectMapper.writeValueAsString(user2)))
  //        .andExpect(status().is4xxClientError())
  //        .andDo(MockMvcResultHandlers.print());
  //  }
}
