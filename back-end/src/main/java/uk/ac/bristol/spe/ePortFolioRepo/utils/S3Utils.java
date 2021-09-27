package uk.ac.bristol.spe.ePortFolioRepo.utils;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.HttpMethod;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;

import java.io.File;
import java.net.URL;

public abstract class S3Utils {
  private static final Regions clientRegion = Regions.US_EAST_1;
  private static final String bucketName = "eportfolio-public";
  private static final AmazonS3 s3Client =
      AmazonS3ClientBuilder.standard()
          .withRegion(clientRegion)
          .withCredentials(DefaultAWSCredentialsProviderChain.getInstance())
          .build();

  public static URL GetUploadLink(String objectKey) {
    URL url = null;

    try {
      java.util.Date expiration = new java.util.Date();
      long expTimeMillis = expiration.getTime();
      expTimeMillis += 1000 * 60 * 60;
      expiration.setTime(expTimeMillis);

      System.out.println("Generating pre-signed URL.");
      GeneratePresignedUrlRequest generatePresignedUrlRequest =
          new GeneratePresignedUrlRequest(bucketName, objectKey)
              .withMethod(HttpMethod.PUT)
              .withExpiration(expiration);

      url = s3Client.generatePresignedUrl(generatePresignedUrlRequest);
    } catch (SdkClientException e) {
      e.printStackTrace();
    }

    return url;
  }

  public static URL UploadObject(File file, String objKeyName) {
    try {
      s3Client.putObject(bucketName, objKeyName, file);
    } catch (AmazonServiceException e) {
      e.printStackTrace();
    }
    return s3Client.getUrl(bucketName, objKeyName);
  }
}
