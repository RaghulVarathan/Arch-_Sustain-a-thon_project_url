package com.ecoaudit.forensics.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "ecoaudit")
public class ForensicProperties {

    private MlService mlService = new MlService();
    private Scoring scoring = new Scoring();

    public static class MlService {
        private String url = "http://localhost:8000";
        private int timeoutMs = 10000;

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        public int getTimeoutMs() {
            return timeoutMs;
        }

        public void setTimeoutMs(int timeoutMs) {
            this.timeoutMs = timeoutMs;
        }
    }

    public static class Scoring {
        private Weights weights = new Weights();
        private Thresholds thresholds = new Thresholds();

        public Weights getWeights() {
            return weights;
        }

        public void setWeights(Weights weights) {
            this.weights = weights;
        }

        public Thresholds getThresholds() {
            return thresholds;
        }

        public void setThresholds(Thresholds thresholds) {
            this.thresholds = thresholds;
        }
    }

    public static class Weights {
        private double isolationForest = 0.40;
        private double biologicalKinetics = 0.30;
        private double powerCorrelation = 0.30;

        public double getIsolationForest() {
            return isolationForest;
        }

        public void setIsolationForest(double isolationForest) {
            this.isolationForest = isolationForest;
        }

        public double getBiologicalKinetics() {
            return biologicalKinetics;
        }

        public void setBiologicalKinetics(double biologicalKinetics) {
            this.biologicalKinetics = biologicalKinetics;
        }

        public double getPowerCorrelation() {
            return powerCorrelation;
        }

        public void setPowerCorrelation(double powerCorrelation) {
            this.powerCorrelation = powerCorrelation;
        }
    }

    public static class Thresholds {
        private double low = 30.0;
        private double moderate = 60.0;
        private double high = 80.0;

        public double getLow() {
            return low;
        }

        public void setLow(double low) {
            this.low = low;
        }

        public double getModerate() {
            return moderate;
        }

        public void setModerate(double moderate) {
            this.moderate = moderate;
        }

        public double getHigh() {
            return high;
        }

        public void setHigh(double high) {
            this.high = high;
        }
    }

    public MlService getMlService() {
        return mlService;
    }

    public void setMlService(MlService mlService) {
        this.mlService = mlService;
    }

    public Scoring getScoring() {
        return scoring;
    }

    public void setScoring(Scoring scoring) {
        this.scoring = scoring;
    }
}
